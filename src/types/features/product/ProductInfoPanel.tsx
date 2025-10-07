export interface ProductInfoPanelProps {
  sku: string;
  description: string;
  dimensions?: {
    weight: number;
    height: number;
    width: number;
    length: number;
  };
}
