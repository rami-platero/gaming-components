import { z } from "zod";
import { Category } from "../entities/Product";

const specObject = z.object({ name: z.string(), value: z.string() });

export const GPUSpecsSchema = z.object({
  processingUnit: specObject,
  memorySpeed: specObject.optional(),
  memoryClock: specObject.optional(),
  memoryType: specObject,
  memoryBus: specObject,
  memorySize: specObject,
  recommendedPSU: specObject,
  powerConnectors: specObject,
  maxResolution: specObject,
  coreClocks: specObject,
  openGLVersion: specObject,
  manufacturer: specObject,
  dimensions: specObject.optional(),
  cudaCores: specObject.optional(),
  streamProcessors: specObject.optional(),
});

export const MotherboardsSpecsSchema = z.object({
  chipset: specObject,
  memory: specObject,
  CPU: specObject,
  USB: specObject,
  audio: specObject,
  wireless: specObject.optional(),
  internalIO: specObject,
  storage: specObject
})

export const KeyboardsSpecsSchema = z.object({
  dimensions: specObject,
  keySwitch: specObject,
  weight: specObject,
  connectivity: specObject,
  lighting: specObject,
  cable: specObject,
  software: specObject,
  contents: specObject,
  color: specObject,
  macroKeys: specObject
})

export type GPUSpecs = z.infer<typeof GPUSpecsSchema>;

export const productSchema = {
  description: z.string().nonempty("This field must be filled."),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  name: z.string().nonempty("This field must be filled."),
  brand: z.string().nonempty("This field must be filled."),
};

export const createProductSchema = z.discriminatedUnion("category", [
  z.object({
    category: z.literal(Category.GPUs),
    ...productSchema,
    specifications: GPUSpecsSchema,
  }),
  z.object({
    category: z.literal(Category.Motherboards),
    ...productSchema,
    specifications: MotherboardsSpecsSchema,
  }),
  z.object({
    category: z.literal(Category.Keyboards),
    ...productSchema,
    specifications: KeyboardsSpecsSchema,
  })
]);

export type CreateProductSchema = typeof createProductSchema

export const getProductSchema = z.object({
  slug: z.string().nonempty("A slug is required to get a product."),
});
