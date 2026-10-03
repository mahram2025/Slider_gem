import React from 'react';
import { X, Check, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { ProductItem } from '../types';
import { ProductIcon } from './ProductIcon';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media */}
        <div className="w-full md:w-1/2 relative bg-slate-100 min-h-[260px] md:min-h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center"
          />
          {product.category && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-md">
              {product.badge_icon && <ProductIcon name={product.badge_icon} className="w-3.5 h-3.5" />}
              <span>{product.category}</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              ))}
              <span className="text-xs font-semibold text-slate-600 ml-1.5">(4.9/5 • 128 reviews)</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 tracking-tight">
              {product.title}
            </h2>

            <div className="text-2xl font-extrabold text-emerald-600 mb-4">
              {product.price}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {product.desc}
            </p>

            {/* Value perks */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Free express 2-day delivery on orders over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2-year international warranty included</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-600" />
                <span>30-day hassle-free return policy</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                alert(`Added "${product.title}" to cart!`);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
            >
              <Check className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
