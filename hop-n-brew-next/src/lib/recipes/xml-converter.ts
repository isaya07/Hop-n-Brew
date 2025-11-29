import {
  IRecipe, IFermentable, IHop, IYeast, IMisc, IWater, IMash, IMashStep,
  IEquipment, IStyle, IFermentation, ICarbonation
} from './types'

/**
 * Convertit un objet Recipe en chaîne XML au format BeerXML
 * @param recipe Objet Recipe à convertir
 * @returns Chaîne XML représentant la recette
 */
export function recipeToBeerXml(recipe: IRecipe): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<RECIPES>\n'
  xml += '  <RECIPE>\n'
  
  // Informations générales de la recette
 xml += `    <NAME>${escapeXml(recipe.name)}</NAME>\n`
  xml += `    <NOTES>${escapeXml(recipe.notes || '')}</NOTES>\n`
  xml += `    <BREWER>${escapeXml(recipe.brewer)}</BREWER>\n`
  xml += `    <ASST_BREWER>${escapeXml(recipe.asstBrewer)}</ASST_BREWER>\n`
  xml += `    <TYPE>${escapeXml(recipe.type)}</TYPE>\n`
  xml += `    <BATCH_SIZE>${recipe.batchSize}</BATCH_SIZE>\n`
  xml += `    <BOIL_SIZE>${recipe.boilSize}</BOIL_SIZE>\n`
  xml += `    <BOIL_TIME>${recipe.boilTime}</BOIL_TIME>\n`
  xml += `    <EFFICIENCY>${recipe.efficiency}</EFFICIENCY>\n`
  xml += `    <OG>${recipe.og}</OG>\n`
  xml += `    <FG>${recipe.fg}</FG>\n`
  xml += `    <TASTE_NOTE>${escapeXml(recipe.tasteNote)}</TASTE_NOTE>\n`
  xml += `    <TASTE_RATING>${escapeXml(recipe.tasteRating)}</TASTE_RATING>\n`
  xml += `    <DATE>${escapeXml(recipe.date)}</DATE>\n`
  
  if (recipe.estOg !== null) {
    xml += `    <EST_OG>${recipe.estOg}</EST_OG>\n`
  }
  
  if (recipe.estFg !== null) {
    xml += `    <EST_FG>${recipe.estFg}</EST_FG>\n`
  }
  
  if (recipe.estColor !== null) {
    xml += `    <EST_COLOR>${recipe.estColor}</EST_COLOR>\n`
  }
  
  if (recipe.ibu !== null) {
    xml += `    <IBU>${recipe.ibu}</IBU>\n`
  }
  
  xml += `    <IBU_METHOD>${escapeXml(recipe.ibuMethod)}</IBU_METHOD>\n`
  
 if (recipe.estAbv !== null) {
    xml += `    <EST_ABV>${recipe.estAbv}</EST_ABV>\n`
  }
  
  if (recipe.abv !== null) {
    xml += `    <ABV>${recipe.abv}</ABV>\n`
  }
  
  if (recipe.actualEfficiency !== null) {
    xml += `    <ACTUAL_EFFICIENCY>${recipe.actualEfficiency}</ACTUAL_EFFICIENCY>\n`
  }
  
  if (recipe.calories !== null) {
    xml += `    <CALORIES>${recipe.calories}</CALORIES>\n`
  }
  
  if (recipe.displayBatchSize !== null) {
    xml += `    <DISPLAY_BATCH_SIZE>${escapeXml(recipe.displayBatchSize)}</DISPLAY_BATCH_SIZE>\n`
  }
  
  if (recipe.displayBoilSize !== null) {
    xml += `    <DISPLAY_BOIL_SIZE>${escapeXml(recipe.displayBoilSize)}</DISPLAY_BOIL_SIZE>\n`
  }
  
  if (recipe.displayOg !== null) {
    xml += `    <DISPLAY_OG>${escapeXml(recipe.displayOg)}</DISPLAY_OG>\n`
  }
  
  if (recipe.displayFg !== null) {
    xml += `    <DISPLAY_FG>${escapeXml(recipe.displayFg)}</DISPLAY_FG>\n`
  }
  
  // Équipement
  xml += '    <EQUIPMENT>\n'
  xml += `      <NAME>${escapeXml(recipe.equipment.name)}</NAME>\n`
  if (recipe.equipment.version !== null) {
    xml += `      <VERSION>${recipe.equipment.version}</VERSION>\n`
  }
  if (recipe.equipment.type !== null) {
    xml += `      <TYPE>${escapeXml(recipe.equipment.type)}</TYPE>\n`
  }
  if (recipe.equipment.boilSize !== null) {
    xml += `      <BOIL_SIZE>${recipe.equipment.boilSize}</BOIL_SIZE>\n`
  }
  if (recipe.equipment.batchSize !== null) {
    xml += `      <BATCH_SIZE>${recipe.equipment.batchSize}</BATCH_SIZE>\n`
  }
  // Ajouter les autres champs d'équipement ici...
  xml += '    </EQUIPMENT>\n'
  
  // Style
  xml += '    <STYLE>\n'
  xml += `      <NAME>${escapeXml(recipe.style.name)}</NAME>\n`
  if (recipe.style.category !== null) {
    xml += `      <CATEGORY>${escapeXml(recipe.style.category)}</CATEGORY>\n`
  }
  // Ajouter les autres champs de style ici...
 xml += '    </STYLE>\n'
  
 // Fermentables
  xml += '    <FERMENTABLES>\n'
  for (const fermentable of recipe.fermentables) {
    xml += fermentableToXml(fermentable)
  }
  xml += '    </FERMENTABLES>\n'
  
  // Houblons
  xml += '    <HOPS>\n'
  for (const hop of recipe.hops) {
    xml += hopToXml(hop)
  }
  xml += '    </HOPS>\n'
  
 // Levures
  xml += '    <YEASTS>\n'
  for (const yeast of recipe.yeasts) {
    xml += yeastToXml(yeast)
  }
  xml += '    </YEASTS>\n'
  
  // Ingrédients divers
  xml += '    <MISCS>\n'
  for (const misc of recipe.miscs) {
    xml += miscToXml(misc)
  }
 xml += '    </MISCS>\n'
  
  // Eau
  xml += '    <WATERS>\n'
  for (const water of recipe.waters) {
    xml += waterToXml(water)
  }
  xml += '    </WATERS>\n'
  
  // Empâtage
  xml += '    <MASH>\n'
  xml += `      <NAME>${escapeXml(recipe.mash.name)}</NAME>\n`
  if (recipe.mash.grainTemp !== null) {
    xml += `      <GRAIN_TEMP>${recipe.mash.grainTemp}</GRAIN_TEMP>\n`
  }
  if (recipe.mash.notes !== null) {
    xml += `      <NOTES>${escapeXml(recipe.mash.notes)}</NOTES>\n`
  }
 // Ajouter les autres champs d'empâtage ici...
  
  // Étapes d'empâtage
  xml += '      <MASH_STEPS>\n'
  for (const mashStep of recipe.mash.mashSteps) {
    xml += mashStepToXml(mashStep)
 }
  xml += '      </MASH_STEPS>\n'
  
  xml += '    </MASH>\n'
  
  // Fermentation
  xml += '    <FERMENTATION>\n'
  xml += `      <NAME>${escapeXml(recipe.fermentation.name)}</NAME>\n`
  if (recipe.fermentation.description !== null) {
    xml += `      <DESCRIPTION>${escapeXml(recipe.fermentation.description)}</DESCRIPTION>\n`
  }
  // Ajouter les autres champs de fermentation ici...
 xml += '    </FERMENTATION>\n'
  
  // Carbonatation
  xml += '    <CARBONATION>\n'
  xml += `      <NAME>${escapeXml(recipe.carbonation.name)}</NAME>\n`
  xml += `      <TYPE>${escapeXml(recipe.carbonation.type)}</TYPE>\n`
  if (recipe.carbonation.amount !== null) {
    xml += `      <AMOUNT>${recipe.carbonation.amount}</AMOUNT>\n`
  }
  if (recipe.carbonation.notes !== null) {
    xml += `      <NOTES>${escapeXml(recipe.carbonation.notes)}</NOTES>\n`
  }
  xml += '    </CARBONATION>\n'
  
  xml += '  </RECIPE>\n'
  xml += '</RECIPES>\n'
  
  return xml
}

/**
 * Convertit un objet Fermentable en chaîne XML
 * @param fermentable Objet Fermentable à convertir
 * @returns Chaîne XML représentant le fermentescible
 */
function fermentableToXml(fermentable: IFermentable): string {
  let xml = '      <FERMENTABLE>\n'
  if (fermentable.name) {
    xml += `        <NAME>${escapeXml(fermentable.name)}</NAME>\n`
  }
  xml += `        <TYPE>${escapeXml(fermentable.type)}</TYPE>\n`
  if (fermentable.amount !== null) {
    xml += `        <AMOUNT>${fermentable.amount}</AMOUNT>\n`
  }
 if (fermentable.yield !== null) {
    xml += `        <YIELD>${fermentable.yield}</YIELD>\n`
  }
  if (fermentable.color !== null) {
    xml += `        <COLOR>${fermentable.color}</COLOR>\n`
  }
  if (fermentable.addAfterBoil !== null) {
    xml += `        <ADD_AFTER_BOIL>${fermentable.addAfterBoil ? 'TRUE' : 'FALSE'}</ADD_AFTER_BOIL>\n`
  }
  if (fermentable.origin !== null) {
    xml += `        <ORIGIN>${escapeXml(fermentable.origin)}</ORIGIN>\n`
  }
  if (fermentable.supplier !== null) {
    xml += `        <SUPPLIER>${escapeXml(fermentable.supplier)}</SUPPLIER>\n`
  }
  if (fermentable.notes !== null) {
    xml += `        <NOTES>${escapeXml(fermentable.notes)}</NOTES>\n`
  }
  if (fermentable.coarseFineDiff !== null) {
    xml += `        <COARSE_FINE_DIFF>${fermentable.coarseFineDiff}</COARSE_FINE_DIFF>\n`
  }
 if (fermentable.moisture !== null) {
    xml += `        <MOISTURE>${fermentable.moisture}</MOISTURE>\n`
  }
  if (fermentable.diastaticPower !== null) {
    xml += `        <DIASTATIC_POWER>${fermentable.diastaticPower}</DIASTATIC_POWER>\n`
  }
  if (fermentable.protein !== null) {
    xml += `        <PROTEIN>${fermentable.protein}</PROTEIN>\n`
  }
 if (fermentable.maxInBatch !== null) {
    xml += `        <MAX_IN_BATCH>${fermentable.maxInBatch}</MAX_IN_BATCH>\n`
  }
 if (fermentable.recommendMash !== null) {
    xml += `        <RECOMMEND_MASH>${fermentable.recommendMash ? 'TRUE' : 'FALSE'}</RECOMMEND_MASH>\n`
  }
  if (fermentable.ibuGalPerLb !== null) {
    xml += `        <IBU_GAL_PER_LB>${fermentable.ibuGalPerLb}</IBU_GAL_PER_LB>\n`
  }
  if (fermentable.potential !== null) {
    xml += `        <POTENTIAL>${fermentable.potential}</POTENTIAL>\n`
  }
 if (fermentable.inventory !== null) {
    xml += `        <INVENTORY>${fermentable.inventory}</INVENTORY>\n`
  }
 if (fermentable.price !== null) {
    xml += `        <PRICE>${fermentable.price}</PRICE>\n`
  }
  if (fermentable.displayColor !== null) {
    xml += `        <DISPLAY_COLOR>${escapeXml(fermentable.displayColor)}</DISPLAY_COLOR>\n`
  }
  xml += '      </FERMENTABLE>\n'
  return xml
}

/**
 * Convertit un objet Hop en chaîne XML
 * @param hop Objet Hop à convertir
 * @returns Chaîne XML représentant le houblon
 */
function hopToXml(hop: IHop): string {
  let xml = '      <HOP>\n'
 if (hop.name) {
    xml += `        <NAME>${escapeXml(hop.name)}</NAME>\n`
  }
  if (hop.alpha !== null) {
    xml += `        <ALPHA>${hop.alpha}</ALPHA>\n`
  }
  if (hop.amount !== null) {
    xml += `        <AMOUNT>${hop.amount}</AMOUNT>\n`
  }
  if (hop.use !== null) {
    xml += `        <USE>${escapeXml(hop.use)}</USE>\n`
  }
  if (hop.time !== null) {
    xml += `        <TIME>${hop.time}</TIME>\n`
  }
  if (hop.form !== null) {
    xml += `        <FORM>${escapeXml(hop.form)}</FORM>\n`
  }
  if (hop.beta !== null) {
    xml += `        <BETA>${hop.beta}</BETA>\n`
  }
  if (hop.hsi !== null) {
    xml += `        <HSI>${hop.hsi}</HSI>\n`
  }
  if (hop.origin !== null) {
    xml += `        <ORIGIN>${escapeXml(hop.origin)}</ORIGIN>\n`
  }
  if (hop.substitutes !== null) {
    xml += `        <SUBSTITUTES>${escapeXml(hop.substitutes)}</SUBSTITUTES>\n`
  }
  if (hop.notes !== null) {
    xml += `        <NOTES>${escapeXml(hop.notes)}</NOTES>\n`
  }
  if (hop.percentLost !== null) {
    xml += `        <PERCENT_LOST>${hop.percentLost}</PERCENT_LOST>\n`
  }
  if (hop.displayAmount !== null) {
    if (hop.displayAmount !== undefined && hop.displayAmount !== null) {
      xml += `        <DISPLAY_AMOUNT>${escapeXml(hop.displayAmount)}</DISPLAY_AMOUNT>\n`
    }
  }
  if (hop.inventory !== null) {
    xml += `        <INVENTORY>${hop.inventory}</INVENTORY>\n`
  }
  if (hop.type !== null) {
    xml += `        <TYPE>${escapeXml(hop.type)}</TYPE>\n`
  }
  if (hop.phenolicCompounds !== null) {
    xml += `        <PHENOLIC_COMPOUNDS>${hop.phenolicCompounds}</PHENOLIC_COMPOUNDS>\n`
  }
  xml += '      </HOP>\n'
  return xml
}

/**
 * Convertit un objet Yeast en chaîne XML
 * @param yeast Objet Yeast à convertir
 * @returns Chaîne XML représentant la levure
 */
function yeastToXml(yeast: IYeast): string {
  let xml = '      <YEAST>\n'
  if (yeast.name) {
    xml += `        <NAME>${escapeXml(yeast.name)}</NAME>\n`
  }
  if (yeast.type !== null) {
    xml += `        <TYPE>${escapeXml(yeast.type)}</TYPE>\n`
  }
  if (yeast.form !== null) {
    xml += `        <FORM>${escapeXml(yeast.form)}</FORM>\n`
  }
  if (yeast.amount !== null) {
    xml += `        <AMOUNT>${yeast.amount}</AMOUNT>\n`
  }
  if (yeast.amountIsWeight !== null) {
    xml += `        <AMOUNT_IS_WEIGHT>${yeast.amountIsWeight ? 'TRUE' : 'FALSE'}</AMOUNT_IS_WEIGHT>\n`
  }
  if (yeast.laboratory !== null) {
    xml += `        <LABORATORY>${escapeXml(yeast.laboratory)}</LABORATORY>\n`
  }
  if (yeast.productId !== null) {
    xml += `        <PRODUCT_ID>${escapeXml(yeast.productId)}</PRODUCT_ID>\n`
  }
  if (yeast.minTemperature !== null) {
    xml += `        <MIN_TEMPERATURE>${yeast.minTemperature}</MIN_TEMPERATURE>\n`
  }
  if (yeast.maxTemperature !== null) {
    xml += `        <MAX_TEMPERATURE>${yeast.maxTemperature}</MAX_TEMPERATURE>\n`
  }
  if (yeast.fermentationTemp !== null) {
    xml += `        <FERMENTATION_TEMP>${yeast.fermentationTemp}</FERMENTATION_TEMP>\n`
  }
  if (yeast.attenuation !== null) {
    xml += `        <ATTENUATION>${yeast.attenuation}</ATTENUATION>\n`
  }
 if (yeast.notes !== null) {
    xml += `        <NOTES>${escapeXml(yeast.notes)}</NOTES>\n`
  }
  if (yeast.bestFor !== null) {
    xml += `        <BEST_FOR>${escapeXml(yeast.bestFor)}</BEST_FOR>\n`
  }
  if (yeast.timesCultured !== null) {
    xml += `        <TIMES_CULTURED>${yeast.timesCultured}</TIMES_CULTURED>\n`
  }
  if (yeast.maxReuse !== null) {
    xml += `        <MAX_REUSE>${yeast.maxReuse}</MAX_REUSE>\n`
  }
  if (yeast.addToSecondary !== null) {
    xml += `        <ADD_TO_SECONDARY>${yeast.addToSecondary ? 'TRUE' : 'FALSE'}</ADD_TO_SECONDARY>\n`
  }
  if (yeast.displayAmount !== null) {
    if (yeast.displayAmount !== undefined && yeast.displayAmount !== null) {
      xml += `        <DISPLAY_AMOUNT>${escapeXml(yeast.displayAmount)}</DISPLAY_AMOUNT>\n`
    }
  }
  if (yeast.inventory !== null) {
    xml += `        <INVENTORY>${yeast.inventory}</INVENTORY>\n`
  }
  xml += '      </YEAST>\n'
  return xml
}

/**
 * Convertit un objet Misc en chaîne XML
 * @param misc Objet Misc à convertir
 * @returns Chaîne XML représentant l'ingrédient divers
 */
function miscToXml(misc: IMisc): string {
  let xml = '      <MISC>\n'
  if (misc.name) {
    xml += `        <NAME>${escapeXml(misc.name)}</NAME>\n`
  }
  if (misc.type !== null) {
    xml += `        <TYPE>${escapeXml(misc.type)}</TYPE>\n`
  }
  if (misc.use !== null) {
    xml += `        <USE>${escapeXml(misc.use)}</USE>\n`
  }
  if (misc.time !== null) {
    xml += `        <TIME>${misc.time}</TIME>\n`
  }
  if (misc.amount !== null) {
    xml += `        <AMOUNT>${misc.amount}</AMOUNT>\n`
  }
  if (misc.amountIsWeight !== null) {
    xml += `        <AMOUNT_IS_WEIGHT>${misc.amountIsWeight ? 'TRUE' : 'FALSE'}</AMOUNT_IS_WEIGHT>\n`
  }
  if (misc.useFor !== null) {
    xml += `        <USE_FOR>${escapeXml(misc.useFor)}</USE_FOR>\n`
  }
  if (misc.notes !== null) {
    xml += `        <NOTES>${escapeXml(misc.notes)}</NOTES>\n`
  }
  if (misc.displayAmount !== null) {
    if (misc.displayAmount !== undefined && misc.displayAmount !== null) {
      xml += `        <DISPLAY_AMOUNT>${escapeXml(misc.displayAmount)}</DISPLAY_AMOUNT>\n`
    }
  }
  xml += '      </MISC>\n'
  return xml
}

/**
 * Convertit un objet Water en chaîne XML
 * @param water Objet Water à convertir
 * @returns Chaîne XML représentant l'eau
 */
function waterToXml(water: IWater): string {
  let xml = '      <WATER>\n'
  if (water.name) {
    xml += `        <NAME>${escapeXml(water.name)}</NAME>\n`
  }
  if (water.amount !== null) {
    xml += `        <AMOUNT>${water.amount}</AMOUNT>\n`
  }
  if (water.displayAmount !== null && water.displayAmount !== undefined) {
    xml += `        <DISPLAY_AMOUNT>${escapeXml(water.displayAmount)}</DISPLAY_AMOUNT>\n`
  }
  if (water.calcium !== null) {
    xml += `        <CALCIUM>${water.calcium}</CALCIUM>\n`
  }
  if (water.bicarbonate !== null) {
    xml += `        <BICARBONATE>${water.bicarbonate}</BICARBONATE>\n`
  }
  if (water.sulfate !== null) {
    xml += `        <SULFATE>${water.sulfate}</SULFATE>\n`
  }
  if (water.chloride !== null) {
    xml += `        <CHLORIDE>${water.chloride}</CHLORIDE>\n`
  }
  if (water.sodium !== null) {
    xml += `        <SODIUM>${water.sodium}</SODIUM>\n`
  }
  if (water.magnesium !== null) {
    xml += `        <MAGNESIUM>${water.magnesium}</MAGNESIUM>\n`
  }
  if (water.ph !== null) {
    xml += `        <PH>${water.ph}</PH>\n`
  }
  if (water.notes !== null) {
    xml += `        <NOTES>${escapeXml(water.notes)}</NOTES>\n`
  }
  xml += '      </WATER>\n'
  return xml
}

/**
 * Convertit un objet MashStep en chaîne XML
 * @param mashStep Objet MashStep à convertir
 * @returns Chaîne XML représentant l'étape d'empâtage
 */
function mashStepToXml(mashStep: IMashStep): string {
  let xml = '        <MASH_STEP>\n'
  xml += `          <NAME>${escapeXml(mashStep.name)}</NAME>\n`
  xml += `          <TYPE>${escapeXml(mashStep.type)}</TYPE>\n`
  if (mashStep.amount !== null) {
    xml += `          <AMOUNT>${mashStep.amount}</AMOUNT>\n`
  }
 if (mashStep.stepTemp !== null) {
    xml += `          <STEP_TEMP>${mashStep.stepTemp}</STEP_TEMP>\n`
  }
  if (mashStep.endTemp !== null) {
    xml += `          <END_TEMP>${mashStep.endTemp}</END_TEMP>\n`
  }
  if (mashStep.stepTime !== null) {
    xml += `          <STEP_TIME>${mashStep.stepTime}</STEP_TIME>\n`
  }
  if (mashStep.rampTime !== null) {
    xml += `          <RAMP_TIME>${mashStep.rampTime}</RAMP_TIME>\n`
  }
  if (mashStep.endOfMash !== null) {
    xml += `          <END_OF_MASH>${mashStep.endOfMash ? 'TRUE' : 'FALSE'}</END_OF_MASH>\n`
  }
  if (mashStep.infuseAmount !== null) {
    xml += `          <INFUSE_AMOUNT>${mashStep.infuseAmount}</INFUSE_AMOUNT>\n`
  }
  if (mashStep.infuseTemp !== null) {
    xml += `          <INFUSE_TEMP>${mashStep.infuseTemp}</INFUSE_TEMP>\n`
  }
  if (mashStep.displayStepTemp !== null) {
    xml += `          <DISPLAY_STEP_TEMP>${escapeXml(mashStep.displayStepTemp)}</DISPLAY_STEP_TEMP>\n`
  }
  if (mashStep.displayEndTemp !== null) {
    xml += `          <DISPLAY_END_TEMP>${escapeXml(mashStep.displayEndTemp)}</DISPLAY_END_TEMP>\n`
  }
  if (mashStep.displayStepTime !== null) {
    xml += `          <DISPLAY_STEP_TIME>${escapeXml(mashStep.displayStepTime)}</DISPLAY_STEP_TIME>\n`
  }
  if (mashStep.displayRampTime !== null) {
    xml += `          <DISPLAY_RAMP_TIME>${escapeXml(mashStep.displayRampTime)}</DISPLAY_RAMP_TIME>\n`
  }
  if (mashStep.displayInfuseAmount !== null) {
    xml += `          <DISPLAY_INFUSE_AMOUNT>${escapeXml(mashStep.displayInfuseAmount)}</DISPLAY_INFUSE_AMOUNT>\n`
  }
  if (mashStep.displayInfuseTemp !== null) {
    xml += `          <DISPLAY_INFUSE_TEMP>${escapeXml(mashStep.displayInfuseTemp)}</DISPLAY_INFUSE_TEMP>\n`
  }
  xml += '        </MASH_STEP>\n'
  return xml
}

/**
 * Échappe les caractères spéciaux XML
 * @param str Chaîne à échapper
 * @returns Chaîne échappée
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, "\\'")
}