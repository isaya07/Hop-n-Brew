/**
 * Types et interfaces pour les recettes de bière
 */

export interface IRecipeIngredient {
  id?: number;
  _id?: string;
  name?: string;
 amount?: number | null;
  displayAmount?: string | null;
  parent?: IRecipe;
  createdAt?: Date;
 updatedAt?: Date;
}

export interface IRecipe {
  id?: number;
  _id?: string;
  name: string;
  notes: string;
  brewer: string;
  asstBrewer: string;
  type: string;
  equipment: IEquipment;
  style: IStyle;
  batchSize: number;
  boilSize: number;
  boilTime: number;
  efficiency: number;
  fermentables: IFermentable[];
  yeasts: IYeast[];
  hops: IHop[];
  miscs: IMisc[];
  waters: IWater[];
  mash: IMash;
 fermentation: IFermentation;
  carbonation: ICarbonation;
  og: number;
  fg: number;
  tasteNote: string;
  tasteRating: string;
  date: string;
 estOg: number | null;
  estFg: number | null;
  estColor: number | null;
  ibu: number | null;
  ibuMethod: string;
  estAbv: number | null;
  abv: number | null;
  actualEfficiency: number | null;
  calories: number | null;
  displayBatchSize: string | null;
  displayBoilSize: string | null;
  displayOg: string | null;
  displayFg: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFermentable extends IRecipeIngredient {
  type: string;
  yield: number | null;
  color: number | null;
  addAfterBoil: boolean | null;
  origin: string | null;
  supplier: string | null;
  notes: string | null;
  coarseFineDiff: number | null;
  moisture: number | null;
  diastaticPower: number | null;
  protein: number | null;
  maxInBatch: number | null;
  recommendMash: boolean | null;
  ibuGalPerLb: number | null;
  potential: number | null;
  inventory: number | null;
  price: number | null;
  displayColor: string | null;
}

export interface IHop extends IRecipeIngredient {
  alpha: number | null;
  use: string | null;
  time: number | null;
  form: string | null;
  beta: number | null;
  hsi: number | null;
  origin: string | null;
  substitutes: string | null;
  notes: string | null;
  percentLost: number | null;
  displayAmount?: string | null;
  inventory: number | null;
  type: string | null;
  phenolicCompounds: number | null;
}

export interface IYeast extends IRecipeIngredient {
  type: string | null;
  form: string | null;
  amountIsWeight: boolean | null;
  laboratory: string | null;
  productId: string | null;
  minTemperature: number | null;
  maxTemperature: number | null;
  fermentationTemp: number | null;
  attenuation: number | null;
  notes: string | null;
  bestFor: string | null;
  timesCultured: number | null;
  maxReuse: number | null;
  addToSecondary: boolean | null;
  displayAmount?: string | null;
  inventory: number | null;
}

export interface IMisc extends IRecipeIngredient {
  type: string | null;
  use: string | null;
  time: number | null;
  amountIsWeight: boolean | null;
  useFor: string | null;
  notes: string | null;
  displayAmount?: string | null;
}

export interface IWater extends IRecipeIngredient {
  calcium: number | null;
  bicarbonate: number | null;
  sulfate: number | null;
  chloride: number | null;
  sodium: number | null;
  magnesium: number | null;
  ph: number | null;
  notes: string | null;
  displayAmount?: string | null;
}

export interface IMash {
  name: string;
  grainTemp: number | null;
  notes: string | null;
  tunTemp: number | null;
  spargeTemp: number | null;
  ph: number | null;
  tunWeight: number | null;
  tunSpecificHeat: number | null;
  equipmentAdjust: boolean | null;
  displayGrainTemp: string | null;
  displayTunTemp: string | null;
  displaySpargeTemp: string | null;
  displayTunWeight: string | null;
  mashSteps: IMashStep[];
}

export interface IMashStep {
  name: string;
  type: string;
  amount: number | null;
  stepTemp: number | null;
  endTemp: number | null;
  stepTime: number | null;
  rampTime: number | null;
  endOfMash: boolean | null;
  infuseAmount: number | null;
  infuseTemp: number | null;
  displayStepTemp: string | null;
  displayEndTemp: string | null;
  displayStepTime: string | null;
  displayRampTime: string | null;
  displayInfuseAmount: string | null;
  displayInfuseTemp: string | null;
}

export interface IMashProfile {
  id?: string;
  name: string;
 description: string | null;
  grainTemp: number | null;
  tunTemp: number | null;
  spargeTemp: number | null;
  spargePh: number | null;
  equipAdjust: boolean | null;
  notes: string | null;
  mashSteps: IMashStep[];
}

export interface IFermentation {
  name: string;
  description: string | null;
  type: string | null;
  form: string | null;
  amount: number | null;
  amountIsWeight: boolean | null;
  yield: number | null;
  attenutation: number | null;
  notes: string | null;
  bestFor: string | null;
  timesCultured: number | null;
  maxReuse: number | null;
  addToSecondary: boolean | null;
  displayAmount: string | null;
  inventory: number | null;
}

export interface ICarbonation {
  name: string;
  type: string;
  amount: number | null;
  notes: string | null;
}

export interface IEquipment {
  name: string;
  version: number | null;
  type: string | null;
  boilSize: number | null;
  batchSize: number | null;
  tubingLength: number | null;
  tubingDiameter: number | null;
  lauterDeadspace: number | null;
  trubChillerLoss: number | null;
  evapRate: number | null;
  boilTime: number | null;
  calcBoilVolume: boolean | null;
  lauterEff: number | null;
  batchSparge: boolean | null;
  displayBoilSize: string | null;
  displayBatchSize: string | null;
  displayTubingLength: string | null;
  displayTubingDiameter: string | null;
  displayLauterDeadspace: string | null;
  displayTrubChillerLoss: string | null;
  displayEvapRate: string | null;
  displayBoilTime: string | null;
}

export interface IStyle {
  name: string;
  category: string | null;
  categoryNumber: number | null;
  styleLetter: string | null;
  styleGuide: string | null;
  type: string | null;
  ogMin: number | null;
  ogMax: number | null;
  fgMin: number | null;
  fgMax: number | null;
  ibuMin: number | null;
  ibuMax: number | null;
  colorSrmMin: number | null;
  colorSrmMax: number | null;
  carbMin: number | null;
  carbMax: number | null;
  abvMin: number | null;
  abvMax: number | null;
  notes: string | null;
  profile: string | null;
  ingredients: string | null;
  examples: string | null;
}