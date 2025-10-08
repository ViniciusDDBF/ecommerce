import type React from 'react';
import type { CreateReviewModalProps, FC, IFileWithPreview } from '@/types';
import { useRef, useState } from 'react';
import { FileImage, FileVideo, Upload, X } from 'lucide-react';
import { Button, Overlay } from '@/components/atoms';
import { FormField } from '@/components/molecules';
import { StarRating } from '@/features';
import { useScrollLock } from '@/hooks';
import { supabase } from '@/SupabaseConfig';
import { useAppSelector } from '@/store/hooks/hooks';

export const CreateReviewModal: FC<CreateReviewModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState<IFileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [reviewTitle, setReviewTitle] = useState<string | null>(null);
  const [reviewContent, setReviewContent] = useState<string | null>(null);
  const user = useAppSelector('user');

  useScrollLock({ isActive: isOpen });

  const handleClose = () => {
    if (onClose) onClose();
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
    setRating(0);
    setIsSubmitting(false);
    setReviewContent(null);
    setReviewTitle(null);
  };

  const handleFileSelect = (newFiles: FileList | null): void => {
    if (!newFiles) return;

    const validFiles = Array.from(newFiles).filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return isImage || isVideo;
    });

    const filesWithPreview: IFileWithPreview[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
    }));
    setFiles((prev) => [...prev, ...filesWithPreview]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (id: string): void => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    if (
      rating === 0 ||
      reviewTitle === null ||
      reviewTitle === '' ||
      reviewContent === null ||
      reviewContent === '' ||
      user?.user?.customer_id === null ||
      user?.user?.customer_id === undefined
    )
      return;

    try {
      const { data } = await supabase
        .from('product_reviews')
        .insert([
          {
            product_id: productId,
            customer_id: user?.user?.customer_id,
            rating: rating,
            content: reviewContent,
            title: reviewTitle,
          },
        ])
        .select();

      if (data && data[0]) {
        const bucket = supabase.storage.from('loja-do-vini');

        const uploadPromises = files.map((fileWithPreview) => {
          const file = fileWithPreview.file;
          const fileExtension = file.name.split('.').pop();
          const filePath = `reviews/product_${productId}/${fileWithPreview.id}.${fileExtension}`;

          return bucket.upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });
        });

        const uploadResults = await Promise.all(uploadPromises);

        const successfulUploads = uploadResults.map((result, index) => {
          const fileWithPreview = files[index];
          const file = fileWithPreview.file;

          return {
            url: `https://niihlyofonxtmzgzanpv.supabase.co/storage/v1/object/public/${result.data?.fullPath}`,
            media_type: file.type.startsWith('image/') ? 'image' : 'video',
            review_id: data[0].id,
          };
        });

        await supabase
          .from('product_review_media')
          .insert(successfulUploads)
          .select();
      }
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }

    /* ---------- Clean up ---------- */
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
    setRating(0);
    setIsSubmitting(false);
    setReviewContent(null);
    setReviewTitle(null);
    handleClose();
  };

  return (
    <Overlay isOpen={isOpen} onClick={handleClose}>
      <div className="custom-scroll-y pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
        <div className="bg-gradient-charcoal border-ember-600/30 pointer-events-auto relative mx-auto flex max-h-[90vh] w-full max-w-[90vw] flex-col rounded-xl border shadow-2xl backdrop-blur-xl sm:max-w-lg">
          {/* Header */}
          <div className="border-charcoal-600 flex items-center justify-between border-b p-4">
            <h2 className="text-charcoal-50 text-xl font-bold">
              Create Review
            </h2>
            <Button
              aria-label="Close cart"
              className="p-2"
              onClick={handleClose}
              size="xs"
              startIcon={
                <X className="text-charcoal-200 h-4 w-4 sm:h-5 sm:w-5" />
              }
              variant="ghost"
            />
          </div>

          {/* Body */}
          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            <StarRating rating={rating} setRating={setRating} />

            {/* Review title */}
            <FormField
              field={{
                name: 'title',
                label: 'Review Title',
                type: 'text',
                placeholder: 'Enter the title of your review',
                validation: { required: true },
              }}
              onChange={(e) => {
                setReviewTitle(e);
              }}
              value={reviewTitle}
            />

            {/* Review title */}
            <FormField
              field={{
                name: 'content',
                label: 'Review Content',
                type: 'textarea',
                placeholder: 'Write your review',
                validation: { required: true },
              }}
              onChange={(e) => {
                setReviewContent(e);
              }}
              value={reviewContent}
            />

            {/* Drop Zone */}
            <h1>Upload files (optional)</h1>
            <div
              className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
                isDragging
                  ? 'border-ember-500 bg-ember-500/5'
                  : 'border-charcoal-700 hover:border-charcoal-600'
              } p-6`}
              onClick={() => fileInputRef.current?.click()}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="glass-effect rounded-xl p-6 text-center">
                <div className="bg-charcoal-800 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full">
                  <Upload
                    className={`h-6 w-6 transition-colors ${isDragging ? 'text-ember-500' : 'text-charcoal-400'}`}
                  />
                </div>
                <h3 className="text-charcoal-200 mb-2 text-lg font-semibold">
                  {isDragging ? 'Drop files here' : 'Upload media files'}
                </h3>
                <p className="text-charcoal-400 mb-4 text-sm">
                  Drag and drop or click to browse
                </p>
                <div className="text-charcoal-500 flex flex-wrap justify-center gap-2 text-xs">
                  <span className="bg-charcoal-800 rounded-full px-3 py-1">
                    Images
                  </span>
                  <span className="bg-charcoal-800 rounded-full px-3 py-1">
                    Videos
                  </span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                accept="image/*,video/*"
                className="hidden"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                type="file"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-charcoal-200 text-lg font-semibold">
                    Selected Files ({files.length})
                  </h3>
                  <Button
                    onClick={() => {
                      files.forEach((f) => URL.revokeObjectURL(f.preview));
                      setFiles([]);
                    }}
                    size="sm"
                    text="Clear all"
                    variant="ghost"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="group glass-effect relative overflow-hidden rounded-xl transition-transform duration-200 hover:scale-[1.02]"
                    >
                      {/* Preview */}
                      <div className="bg-charcoal-800 relative aspect-video overflow-hidden">
                        {file.type === 'image' ? (
                          <img
                            alt={file.name}
                            className="h-full w-full object-cover"
                            src={file.preview}
                          />
                        ) : (
                          <video
                            className="h-full w-full object-cover"
                            src={file.preview}
                          />
                        )}

                        {/* Type Badge */}
                        <div className="absolute bottom-0 left-0">
                          <div className="bg-charcoal-900/80 text-charcoal-300 flex items-center gap-1 px-2 py-2 text-xs backdrop-blur-sm">
                            {file.type === 'image' ? (
                              <FileImage className="h-3 w-3" />
                            ) : (
                              <FileVideo className="h-3 w-3" />
                            )}
                            {file.type}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          className="absolute top-2 right-2 border-red-400"
                          onClick={() => removeFile(file.id)}
                          size="xs"
                          startIcon={
                            <X className="h-4 w-4 text-red-400 sm:h-5 sm:w-5" />
                          }
                          variant="outline"
                        />
                      </div>

                      {/* File Info */}
                      <div className="p-3">
                        <p className="text-charcoal-200 mb-1 truncate text-sm font-medium">
                          {file.name}
                        </p>
                        <p className="text-charcoal-500 text-xs">{file.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-charcoal-600 flex justify-end border-t p-4">
            <Button
              disabled={
                isSubmitting ||
                rating === 0 ||
                reviewTitle === null ||
                reviewTitle === '' ||
                reviewContent === null ||
                reviewContent === ''
              }
              loading={isSubmitting}
              onClick={handleSubmit}
              size="lg"
              startIcon={!isSubmitting && <Upload className="h-5 w-5" />}
              text={isSubmitting ? 'Submitting...' : 'Submit Review'}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </Overlay>
  );
};
