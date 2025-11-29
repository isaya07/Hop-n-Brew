[**Hop-n-Brew Next v1.0.0**](../../README.md)

***

[Hop-n-Brew Next](../../modules.md) / [utils](../README.md) / default

# Class: default

Defined in: utils.ts:5

Fonctions utilitaires pour les calculs de brassage
Basé sur les utilitaires existants du projet original

## Methods

### cToF()

> `static` **cToF**(`celsius`): `number`

Defined in: utils.ts:49

Convertit des unités de température Celsius en Fahrenheit

#### Parameters

##### celsius

`number`

Température en Celsius

#### Returns

`number`

Température en Fahrenheit

***

### ebcToSrm()

> `static` **ebcToSrm**(`ebc`): `number`

Defined in: utils.ts:130

Convertit des unités de couleur EBC en SRM

#### Parameters

##### ebc

`number`

Couleur en EBC

#### Returns

`number`

Couleur en SRM

***

### fToC()

> `static` **fToC**(`fahrenheit`): `number`

Defined in: utils.ts:58

Convertit des unités de température Fahrenheit en Celsius

#### Parameters

##### fahrenheit

`number`

Température en Fahrenheit

#### Returns

`number`

Température en Celsius

***

### gallonsToLiters()

> `static` **gallonsToLiters**(`gallons`): `number`

Defined in: utils.ts:112

Convertit des unités de volume de gallons en litres

#### Parameters

##### gallons

`number`

Volume en gallons

#### Returns

`number`

Volume en litres

***

### getDate()

> `static` **getDate**(): `string`

Defined in: utils.ts:138

Obtient la date actuelle au format JJ/MM/AA

#### Returns

`string`

La date actuelle formatée

***

### kgToLb()

> `static` **kgToLb**(`kg`): `number`

Defined in: utils.ts:85

Convertit des unités de poids de kilogrammes en livres

#### Parameters

##### kg

`number`

Poids en kilogrammes

#### Returns

`number`

Poids en livres

***

### lbToKg()

> `static` **lbToKg**(`lb`): `number`

Defined in: utils.ts:94

Convertit des unités de poids de livres en kilogrammes

#### Parameters

##### lb

`number`

Poids en livres

#### Returns

`number`

Poids en kilogrammes

***

### litersToGallons()

> `static` **litersToGallons**(`liters`): `number`

Defined in: utils.ts:103

Convertit des unités de volume de litres en gallons

#### Parameters

##### liters

`number`

Volume en litres

#### Returns

`number`

Volume en gallons

***

### onceToLiter()

> `static` **onceToLiter**(`once`): `number`

Defined in: utils.ts:40

Convertit des unités de volume d'onces en litres

#### Parameters

##### once

`number`

Volume en onces

#### Returns

`number`

Volume en litres

***

### platoToSg()

> `static` **platoToSg**(`plato`): `number`

Defined in: utils.ts:31

Convertit des degrés Plato en densité spécifique (SG)

#### Parameters

##### plato

`number`

Degrés Plato

#### Returns

`number`

Densité spécifique

***

### ppgToYield()

> `static` **ppgToYield**(`ppg`): `number`

Defined in: utils.ts:76

Convertit des points par livre par gallon (PPG) en rendement en pourcentage

#### Parameters

##### ppg

`number`

Points par livre par gallon

#### Returns

`number`

Rendement en pourcentage

***

### roundDecimal()

> `static` **roundDecimal**(`nombre`, `precision`): `number`

Defined in: utils.ts:12

Arrondit un nombre à une précision donnée

#### Parameters

##### nombre

`number`

Le nombre à arrondir

##### precision

`number` = `2`

La précision (nombre de décimales)

#### Returns

`number`

Le nombre arrondi

***

### sgToPlato()

> `static` **sgToPlato**(`sg`): `number`

Defined in: utils.ts:22

Convertit une densité spécifique (SG) en degrés Plato

#### Parameters

##### sg

`number`

Densité spécifique

#### Returns

`number`

Degrés Plato

***

### srmToEbc()

> `static` **srmToEbc**(`srm`): `number`

Defined in: utils.ts:121

Convertit des unités de couleur SRM en EBC

#### Parameters

##### srm

`number`

Couleur en SRM

#### Returns

`number`

Couleur en EBC

***

### yieldToPpg()

> `static` **yieldToPpg**(`yieldPercentage`): `number`

Defined in: utils.ts:67

Convertit un rendement en pourcentage en points par livre par gallon (PPG)

#### Parameters

##### yieldPercentage

`number`

Rendement en pourcentage

#### Returns

`number`

Points par livre par gallon
