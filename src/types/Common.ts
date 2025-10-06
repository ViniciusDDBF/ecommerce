export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type MaskType = 'phone' | 'cpf' | 'cnpj';
export type PositionX = 'left' | 'right';
export type PositionY = 'top' | 'bottom';

export type Orientation = 'horizontal' | 'vertical';

export interface Media {
  id?: number;
  media_type: string;
  url: string;
  created_at?: string;
}

export interface MediaThumbnail {
  url: string;
  media_type: string;
}
