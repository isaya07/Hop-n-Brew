[**Hop-n-Brew Next v1.0.0**](../../README.md)

***

[Hop-n-Brew Next](../../modules.md) / [brew-calculator](../README.md) / BrewCalculator

# Class: BrewCalculator

Defined in: brew-calculator.ts:7

Calculateur de brassage pour les recettes de bière
Basé sur les calculs existants du projet original

## Methods

### calculateABV()

> `static` **calculateABV**(`og`, `fg`): `number`

Defined in: brew-calculator.ts:51

Calcule le taux d'alcool par volume (ABV)

#### Parameters

##### og

`number`

Densité initiale

##### fg

`number`

Densité finale

#### Returns

`number`

Pourcentage d'alcool par volume

***

### calculateCalories()

> `static` **calculateCalories**(`og`, `fg`): `number`

Defined in: brew-calculator.ts:165

Calcule les calories pour 12 oz (355 ml) de bière

#### Parameters

##### og

`number`

Densité initiale

##### fg

`number`

Densité finale

#### Returns

`number`

Calories pour 12 oz

***

### calculateColor()

> `static` **calculateColor**(`fermentables`, `batchSize`): `number`

Defined in: brew-calculator.ts:130

Calcule la couleur en SRM

#### Parameters

##### fermentables

`object`[]

Liste des fermentables avec leur poids et couleur

##### batchSize

`number`

Volume total en litres

#### Returns

`number`

Couleur en SRM

***

### calculateEfficiency()

> `static` **calculateEfficiency**(`actualOG`, `expectedOG`): `number`

Defined in: brew-calculator.ts:154

Calcule l'efficacité du brassage

#### Parameters

##### actualOG

`number`

Densité initiale réelle mesurée

##### expectedOG

`number`

Densité initiale prévue

#### Returns

`number`

Efficacité en pourcentage

***

### calculateFinalGravity()

> `static` **calculateFinalGravity**(`og`, `attenuation`): `number`

Defined in: brew-calculator.ts:40

Calcule la densité finale (FG) en fonction de l'atténuation

#### Parameters

##### og

`number`

Densité initiale

##### attenuation

`number`

Pourcentage d'atténuation (0-100)

#### Returns

`number`

Densité finale en SG

***

### calculateIBU()

> `static` **calculateIBU**(`hops`, `og`, `batchSize`, `ibuMethod`): `number`

Defined in: brew-calculator.ts:64

Calcule l'IBU (International Bitterness Units)

#### Parameters

##### hops

`object`[]

Liste des houblons avec leur alpha-acide, poids et temps d'ébullition

##### og

`number`

Densité initiale

##### batchSize

`number`

Volume total en litres

##### ibuMethod

`string` = `'Tinseth'`

Méthode de calcul (Tinseth, Rager, etc.)

#### Returns

`number`

IBU

***

### calculateOriginalGravity()

> `static` **calculateOriginalGravity**(`fermentables`, `batchSize`, `efficiency`): `number`

Defined in: brew-calculator.ts:15

Calcule la densité initiale (OG) en fonction des ingrédients

#### Parameters

##### fermentables

`object`[]

Liste des fermentables avec leur poids et rendement

##### batchSize

`number`

Volume total de moût en litres

##### efficiency

`number` = `75`

Efficacité du brassage (0-100)

#### Returns

`number`

Densité initiale en SG (Specific Gravity)
