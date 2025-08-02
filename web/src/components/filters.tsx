"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Rating, RatingButton } from "./ui/shadcn-io/rating";
import { Slider } from "@/components/ui/slider";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useState } from "react";

const filterOrder = ["Klima", "Mutfak", "Wifi", "TV"];

const categories = [
  { id: "otel", label: "Otel", piece: 100 },
  { id: "kiralik-daire", label: "Kiralık daire", piece: 100 },
  { id: "villa", label: "Villa", piece: 100 },
  { id: "bungalov", label: "Bungalov", piece: 100 },
  { id: "hostel", label: "Hostel", piece: 10 },
  { id: "pansiyon", label: "Pansiyon", piece: 10 },
] as const;
const ratings = [
  { id: "5", label: "5", piece: 100 },
  { id: "4", label: "4", piece: 100 },
  { id: "3", label: "3", piece: 100 },
  { id: "2", label: "2", piece: 100 },
  { id: "1", label: "1", piece: 100 },
] as const;

const FormSchema = z.object({
  categories: z.array(z.string()).optional(),
});

export function Filters() {
  const [priceRange, setPriceRange] = useState([50, 40000]);
  const [minPrice, maxPrice] = priceRange;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Seçilen kategoriler:", data.categories);
  };

  const handlePriceRangeChange = (newRange: number[]) => {
    setPriceRange(newRange);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 50;
    setPriceRange([Math.min(value, maxPrice - 1), maxPrice]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 40000;
    setPriceRange([minPrice, Math.max(value, minPrice + 1)]);
  };

  return (
    <div className="lg:col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filtreler</h2>
        <Button variant="outline" size="sm" className="rounded-full">
          Temizle
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border p-6 space-y-4">
        <Accordion
          type="multiple"
          defaultValue={["Kategori", "Değerlendirme", "Fiyat", "other"]}
        >
          <AccordionItem value="Kategori">
            <AccordionTrigger>Kategori</AccordionTrigger>
            <AccordionContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                      <FormItem className="flex flex-col gap-2">
                        {categories.map((cat) => (
                          <FormField
                            key={cat.id}
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(cat.id)}
                                    onCheckedChange={(checked) => {
                                      const updated = checked
                                        ? [...(field.value || []), cat.id]
                                        : field.value?.filter(
                                            (v) => v !== cat.id
                                          );
                                      field.onChange(updated);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm flex items-center justify-between gap-2 w-full">
                                  <p>{cat.label}</p>
                                  <p className="text-muted-foreground text-sm">
                                    {`(${cat.piece})`}
                                  </p>
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="Değerlendirme">
            <AccordionTrigger>Değerlendirme</AccordionTrigger>
            <AccordionContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                      <FormItem className="flex flex-col gap-2">
                        {ratings.map((rating) => (
                          <FormField
                            key={rating.id}
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(rating.id)}
                                    onCheckedChange={(checked) => {
                                      const updated = checked
                                        ? [...(field.value || []), rating.id]
                                        : field.value?.filter(
                                            (v) => v !== rating.id
                                          );
                                      field.onChange(updated);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm flex items-center justify-between gap-2 w-full">
                                  <div className="flex items-center gap-2">
                                    <p>{rating.label}</p>
                                    <Rating
                                      defaultValue={Number(rating.id)}
                                      readOnly
                                      className="text-yellow-500"
                                    >
                                      {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                          <RatingButton key={index} size={10} />
                                        )
                                      )}
                                    </Rating>
                                  </div>
                                  <p className="text-muted-foreground text-sm">
                                    {`(${rating.piece})`}
                                  </p>
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="Fiyat">
            <AccordionTrigger>Fiyat</AccordionTrigger>
            <AccordionContent>
              <div className="w-full">
                <div className="w-full flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">50₺</span>
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={40000}
                    min={50}
                    defaultValue={[50, 100000]}
                    step={1}
                    className="w-full cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground">
                    100.000₺
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-sm text-muted-foreground text-center">
                    Min.fiyat
                  </Label>
                  <Input
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    type="number"
                    placeholder="50 ₺"
                    min={50}
                    max={maxPrice - 1}
                    className="w-full px-1"
                  />
                </div>
                <div className="flex items-end justify-center pb-1">
                  <span className="text-sm text-muted-foreground">
                    -
                  </span>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-sm text-muted-foreground text-center">
                    Max.fiyat
                  </Label>
                  <Input
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    type="number"
                    placeholder="40000 ₺"
                    min={minPrice + 1}
                    max={40000}
                    className="w-full px-1"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="other">
            <AccordionTrigger>Diğer</AccordionTrigger>
            <AccordionContent>
              <div className="">
                {filterOrder.map((item) => (
                  <Button
                    key={item}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
