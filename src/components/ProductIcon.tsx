import React from 'react';
import {
  Flame,
  Star,
  Sparkles,
  Gem,
  Sun,
  Award,
  Droplets,
  Compass,
  ArrowRight,
  ShoppingBag,
  Headphones,
  Eye,
  Sliders,
  Volume2,
  Check,
  Heart,
  Tag,
  Package,
  Layers,
  Info
} from 'lucide-react';

interface ProductIconProps {
  name?: string;
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ name, className = 'w-4 h-4' }) => {
  if (!name) return null;

  switch (name.toLowerCase()) {
    case 'flame':
    case 'fire':
      return <Flame className={className} />;
    case 'star':
      return <Star className={className} />;
    case 'sparkles':
    case 'magic':
      return <Sparkles className={className} />;
    case 'gem':
    case 'diamond':
      return <Gem className={className} />;
    case 'sun':
      return <Sun className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'droplets':
    case 'water':
      return <Droplets className={className} />;
    case 'compass':
      return <Compass className={className} />;
    case 'arrow-right':
    case 'arrow':
      return <ArrowRight className={className} />;
    case 'shopping-bag':
    case 'cart':
      return <ShoppingBag className={className} />;
    case 'headphones':
      return <Headphones className={className} />;
    case 'eye':
      return <Eye className={className} />;
    case 'sliders':
      return <Sliders className={className} />;
    case 'volume-2':
    case 'sound':
      return <Volume2 className={className} />;
    case 'check':
      return <Check className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'tag':
      return <Tag className={className} />;
    case 'package':
      return <Package className={className} />;
    case 'layers':
      return <Layers className={className} />;
    default:
      return <Info className={className} />;
  }
};
