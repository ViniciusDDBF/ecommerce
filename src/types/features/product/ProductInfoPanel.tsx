export interface ProductInfoPanelProps {
  description: string;
  dimensions?: {
    weight: number;
    height: number;
    width: number;
    length: number;
  };
  sku: string;
}
