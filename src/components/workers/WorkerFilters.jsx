import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, X, Star, MapPin, CheckCircle } from 'lucide-react';

const cities = [
  'Abidjan',
  'Bouaké',
  'Daloa',
  'Yamoussoukro',
  'San-Pédro',
  'Korhogo',
  'Man',
  'Divo',
  'Gagnoa',
  'Abengourou',
];

const communes = [
  'Cocody',
  'Plateau',
  'Marcory',
  'Treichville',
  'Yopougon',
  'Abobo',
  'Adjamé',
  'Koumassi',
  'Port-Bouët',
  'Bingerville',
];

const categories = [
  { value: 'plumbing', labelFr: 'Plomberie', labelEn: 'Plumbing' },
  { value: 'electrical', labelFr: 'Électricité', labelEn: 'Electrical' },
  { value: 'carpentry', labelFr: 'Menuiserie', labelEn: 'Carpentry' },
  { value: 'painting', labelFr: 'Peinture', labelEn: 'Painting' },
  { value: 'masonry', labelFr: 'Maçonnerie', labelEn: 'Masonry' },
  { value: 'cleaning', labelFr: 'Nettoyage', labelEn: 'Cleaning' },
  { value: 'gardening', labelFr: 'Jardinage', labelEn: 'Gardening' },
  { value: 'airConditioning', labelFr: 'Climatisation', labelEn: 'Air Conditioning' },
  { value: 'roofing', labelFr: 'Toiture', labelEn: 'Roofing' },
  { value: 'welding', labelFr: 'Soudure', labelEn: 'Welding' },
  { value: 'tiling', labelFr: 'Carrelage', labelEn: 'Tiling' },
  { value: 'moving', labelFr: 'Déménagement', labelEn: 'Moving' },
];

export default function WorkerFilters({ filters, onFilterChange, onReset }) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          {language === 'fr' ? 'Catégorie' : 'Category'}
        </Label>
        <Select
          value={filters.category || ''}
          onValueChange={(value) => onFilterChange({ category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={language === 'fr' ? 'Toutes les catégories' : 'All categories'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>
              {language === 'fr' ? 'Toutes les catégories' : 'All categories'}
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {language === 'fr' ? cat.labelFr : cat.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          {language === 'fr' ? 'Ville' : 'City'}
        </Label>
        <Select
          value={filters.city || ''}
          onValueChange={(value) => onFilterChange({ city: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={language === 'fr' ? 'Toutes les villes' : 'All cities'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>
              {language === 'fr' ? 'Toutes les villes' : 'All cities'}
            </SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Commune */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          {language === 'fr' ? 'Commune' : 'Commune'}
        </Label>
        <Select
          value={filters.commune || ''}
          onValueChange={(value) => onFilterChange({ commune: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={language === 'fr' ? 'Toutes les communes' : 'All communes'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>
              {language === 'fr' ? 'Toutes les communes' : 'All communes'}
            </SelectItem>
            {communes.map((commune) => (
              <SelectItem key={commune} value={commune}>
                {commune}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Minimum Rating */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          {language === 'fr' ? 'Note minimum' : 'Minimum Rating'}: {filters.minRating || 0}
          <Star className="inline h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
        </Label>
        <Slider
          value={[filters.minRating || 0]}
          onValueChange={([value]) => onFilterChange({ minRating: value })}
          max={5}
          step={0.5}
          className="w-full"
        />
      </div>

      {/* Verified Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={filters.verifiedOnly || false}
          onCheckedChange={(checked) => onFilterChange({ verifiedOnly: checked })}
        />
        <Label htmlFor="verified" className="text-sm font-medium cursor-pointer flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          {language === 'fr' ? 'Ouvriers vérifiés uniquement' : 'Verified workers only'}
        </Label>
      </div>

      {/* Available Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="available"
          checked={filters.availableOnly || false}
          onCheckedChange={(checked) => onFilterChange({ availableOnly: checked })}
        />
        <Label htmlFor="available" className="text-sm font-medium cursor-pointer">
          {language === 'fr' ? 'Disponibles uniquement' : 'Available only'}
        </Label>
      </div>

      {/* Reset Button */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onReset}
      >
        <X className="h-4 w-4 mr-2" />
        {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset Filters'}
      </Button>
    </div>
  );

  // Desktop Sidebar
  const DesktopFilters = () => (
    <div className="hidden lg:block w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
        <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
          <Filter className="h-5 w-5 text-orange-500" />
          {t('common.filter')}
        </h3>
        <FilterContent />
      </div>
    </div>
  );

  // Mobile Sheet
  const MobileFilters = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden flex items-center gap-2">
          <Filter className="h-4 w-4" />
          {t('common.filter')}
          {Object.values(filters).filter(Boolean).length > 0 && (
            <span className="bg-orange-500 text-white text-xs rounded-full px-2">
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-orange-500" />
            {t('common.filter')}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterContent />
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <DesktopFilters />
      <MobileFilters />
    </>
  );
}