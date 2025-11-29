import { RecipeApi } from './recipes/RecipeApi';
import { FermentableApi } from './ingredients/FermentableApi';
import { HopApi } from './ingredients/HopApi';
import { YeastApi } from './ingredients/YeastApi';
import { MiscApi } from './ingredients/MiscApi';
import { WaterApi } from './ingredients/WaterApi';
import { EquipmentApi } from './profiles/EquipmentApi';
import { StyleApi } from './profiles/StyleApi';
import { FermentationApi } from './profiles/FermentationApi';
import { CarbonationApi } from './profiles/CarbonationApi';
import { MashApi } from './profiles/MashApi';
import { UserApi } from './users/UserApi';

export class ApiManager {
  recipes = new RecipeApi();
  fermentables = new FermentableApi();
  hops = new HopApi();
  yeasts = new YeastApi();
  miscs = new MiscApi();
  waters = new WaterApi();
  equipment = new EquipmentApi();
  styles = new StyleApi();
  fermentation = new FermentationApi();
  carbonation = new CarbonationApi();
  mash = new MashApi();
  users = new UserApi();
}

export default new ApiManager();