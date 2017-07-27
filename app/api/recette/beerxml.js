/*
@preserve
Recette.js BeerXML Plugin
Copyright 2013 Daniel G. Taylor <danielgtaylor@gmail.com>
https://github.com/homebrewing/Recettejs-beerxml
 */

(function () {
  var Recette
  var DOMParser
  var ref
  // var ref1

  Recette = (ref = this.Recette) != null ? ref : require('api/recette/recette')

  DOMParser = require('xmldom').DOMParser

  Recette.Recipe.fromBeerXml = xml => {
    var doc
    var fermentable
    var fermentableNode
    var fermentableProperty
    var i
    var j
    var k
    var l
    var len
    var len1
    var len10
    var len11
    var len2
    var len3
    var len4
    var len5
    var len6
    var len7
    var len8
    var len9
    var m
    var mash
    var mashProperty
    var n
    var o
    var p
    var parser
    var q
    var r
    var recipe
    var recipeNode
    var recipeProperty
    var recipes
    var ref10
    var ref11
    var ref12
    var ref13
    var ref14
    var ref2
    var ref3
    var ref4
    var ref5
    var ref6
    var ref7
    var ref8
    var ref9
    var s
    var spice
    var spiceNode
    var spiceProperty
    var step
    var stepNode
    var stepProperty
    var styleNode
    var t
    var yeast
    var yeastNode
    var yeastProperty
    recipes = []
    parser = new DOMParser()
    doc = parser.parseFromString(xml, 'text/xml')
    ref2 = doc.documentElement.childNodes || []
    for (i = 0, len = ref2.length; i < len; i++) {
      recipeNode = ref2[ i ]
      if (recipeNode.nodeName.toLowerCase() !== 'recipe') {
        continue
      }
      recipe = new Recette.Recipe()
      ref3 = recipeNode.childNodes || []
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        recipeProperty = ref3[ j ]
        switch (recipeProperty.nodeName.toLowerCase()) {
          case 'name':
            recipe.name = recipeProperty.textContent
            break
          case 'brewer':
            recipe.author = recipeProperty.textContent
            break
          case 'batch_size':
            recipe.batchSize = parseFloat(recipeProperty.textContent)
            break
          case 'boil_size':
            recipe.boilSize = parseFloat(recipeProperty.textContent)
            break
          case 'efficiency':
            recipe.mashEfficiency = parseFloat(recipeProperty.textContent)
            break
          case 'primary_age':
            recipe.primaryDays = parseFloat(recipeProperty.textContent)
            break
          case 'primary_temp':
            recipe.primaryTemp = parseFloat(recipeProperty.textContent)
            break
          case 'secondary_age':
            recipe.secondaryDays = parseFloat(recipeProperty.textContent)
            break
          case 'secondary_temp':
            recipe.secondaryTemp = parseFloat(recipeProperty.textContent)
            break
          case 'tertiary_age':
            recipe.tertiaryDays = parseFloat(recipeProperty.textContent)
            break
          case 'tertiary_temp':
            recipe.tertiaryTemp = parseFloat(recipeProperty.textContent)
            break
          case 'carbonation':
            recipe.bottlingPressure = parseFloat(recipeProperty.textContent)
            break
          case 'carbonation_temp':
            recipe.bottlingTemp = parseFloat(recipeProperty.textContent)
            break
          case 'age':
            recipe.agingDays = parseFloat(recipeProperty.textContent)
            break
          case 'age_temp':
            recipe.agingTemp = parseFloat(recipeProperty.textContent)
            break
          case 'style':
            recipe.style = {
              og: [ 1.000, 1.150 ],
              fg: [ 1.000, 1.150 ],
              ibu: [ 0, 150 ],
              color: [ 0, 500 ],
              abv: [ 0, 14 ],
              carb: [ 1.0, 4.0 ]
            }
            ref4 = recipeProperty.childNodes || []
            for (k = 0, len2 = ref4.length; k < len2; k++) {
              styleNode = ref4[ k ]
              switch (styleNode.nodeName.toLowerCase()) {
                case 'name':
                  recipe.style.name = styleNode.textContent
                  break
                case 'category':
                  recipe.style.category = styleNode.textContent
                  break
                case 'og_min':
                  recipe.style.og[ 0 ] = parseFloat(styleNode.textContent)
                  break
                case 'og_max':
                  recipe.style.og[ 1 ] = parseFloat(styleNode.textContent)
                  break
                case 'fg_min':
                  recipe.style.fg[ 0 ] = parseFloat(styleNode.textContent)
                  break
                case 'fg_max':
                  recipe.style.fg[ 1 ] = parseFloat(styleNode.textContent)
                  break
                case 'ibu_min':
                  recipe.style.ibu[ 0 ] = parseFloat(styleNode.textContent)
                  break
                case 'ibu_max':
                  recipe.style.ibu[ 1 ] = parseFloat(styleNode.textContent)
                  break
                case 'color_min':
                  recipe.style.color[ 0 ] = parseFloat(styleNode.textContent)
                  break
                case 'color_max':
                  recipe.style.color[ 1 ] = parseFloat(styleNode.textContent)
                  break
                case 'abv_min':
                  recipe.style.abv[ 0 ] = parseFloat(styleNode.textContent)
                  break
                case 'abv_max':
                  recipe.style.abv[ 1 ] = parseFloat(styleNode.textContent)
                  break
                case 'carb_min':
                  recipe.style.carb[ 0 ] = parseFloat(styleNode.textContent)
                  break
                case 'carb_max':
                  recipe.style.carb[ 1 ] = parseFloat(styleNode.textContent)
              }
            }
            break
          case 'fermentables':
            ref5 = recipeProperty.childNodes || []
            for (l = 0, len3 = ref5.length; l < len3; l++) {
              fermentableNode = ref5[ l ]
              if (fermentableNode.nodeName.toLowerCase() !== 'fermentable') {
                continue
              }
              fermentable = new Recette.Fermentable()
              ref6 = fermentableNode.childNodes || []
              for (m = 0, len4 = ref6.length; m < len4; m++) {
                fermentableProperty = ref6[ m ]
                switch (fermentableProperty.nodeName.toLowerCase()) {
                  case 'name':
                    fermentable.name = fermentableProperty.textContent
                    break
                  case 'amount':
                    fermentable.weight = parseFloat(fermentableProperty.textContent)
                    break
                  case 'yield':
                    fermentable.yield = parseFloat(fermentableProperty.textContent)
                    break
                  case 'color':
                    fermentable.color = parseFloat(fermentableProperty.textContent)
                    break
                  case 'add_after_boil':
                    fermentable.late = fermentableProperty.textContent.toLowerCase() === 'true'
                }
              }
              recipe.fermentables.push(fermentable)
            }
            break
          case 'hops':
          case 'miscs':
            ref7 = recipeProperty.childNodes || []
            for (n = 0, len5 = ref7.length; n < len5; n++) {
              spiceNode = ref7[ n ]
              if ((ref8 = spiceNode.nodeName.toLowerCase()) !== 'hop' && ref8 !== 'misc') {
                continue
              }
              spice = new Recette.Spice()
              ref9 = spiceNode.childNodes || []
              for (o = 0, len6 = ref9.length; o < len6; o++) {
                spiceProperty = ref9[ o ]
                switch (spiceProperty.nodeName.toLowerCase()) {
                  case 'name':
                    spice.name = spiceProperty.textContent
                    break
                  case 'amount':
                    spice.weight = parseFloat(spiceProperty.textContent)
                    break
                  case 'alpha':
                    spice.aa = parseFloat(spiceProperty.textContent)
                    break
                  case 'use':
                    spice.use = spiceProperty.textContent
                    break
                  case 'form':
                    spice.form = spiceProperty.textContent
                }
              }
              recipe.spices.push(spice)
            }
            break
          case 'yeasts':
            ref10 = recipeProperty.childNodes || []
            for (p = 0, len7 = ref10.length; p < len7; p++) {
              yeastNode = ref10[ p ]
              if (yeastNode.nodeName.toLowerCase() !== 'yeast') {
                continue
              }
              yeast = new Recette.Yeast()
              ref11 = yeastNode.childNodes || []
              for (q = 0, len8 = ref11.length; q < len8; q++) {
                yeastProperty = ref11[ q ]
                switch (yeastProperty.nodeName.toLowerCase()) {
                  case 'name':
                    yeast.name = yeastProperty.textContent
                    break
                  case 'type':
                    yeast.type = yeastProperty.textContent
                    break
                  case 'form':
                    yeast.form = yeastProperty.textContent
                    break
                  case 'attenuation':
                    yeast.attenuation = parseFloat(yeastProperty.textContent)
                }
              }
              recipe.yeast.push(yeast)
            }
            break
          case 'mash':
            mash = recipe.mash = new Recette.Mash()
            ref12 = recipeProperty.childNodes || []
            for (r = 0, len9 = ref12.length; r < len9; r++) {
              mashProperty = ref12[ r ]
              switch (mashProperty.nodeName.toLowerCase()) {
                case 'name':
                  mash.name = mashProperty.textContent
                  break
                case 'grain_temp':
                  mash.grainTemp = parseFloat(mashProperty.textContent)
                  break
                case 'sparge_temp':
                  mash.spargeTemp = parseFloat(mashProperty.textContent)
                  break
                case 'ph':
                  mash.ph = parseFloat(mashProperty.textContent)
                  break
                case 'notes':
                  mash.notes = mashProperty.textContent
                  break
                case 'mash_steps':
                  ref13 = mashProperty.childNodes || []
                  for (s = 0, len10 = ref13.length; s < len10; s++) {
                    stepNode = ref13[ s ]
                    if (stepNode.nodeName.toLowerCase() !== 'mash_step') {
                      continue
                    }
                    step = new Recette.MashStep()
                    ref14 = stepNode.childNodes || []
                    for (t = 0, len11 = ref14.length; t < len11; t++) {
                      stepProperty = ref14[ t ]
                      switch (stepProperty.nodeName.toLowerCase()) {
                        case 'name':
                          step.name = stepProperty.textContent
                          break
                        case 'type':
                          step.type = stepProperty.textContent
                          break
                        case 'infuse_amount':
                          step.waterRatio = parseFloat(stepProperty.textContent) / recipe.grainWeight()
                          break
                        case 'step_temp':
                          step.temp = parseFloat(stepProperty.textContent)
                          break
                        case 'end_temp':
                          step.endTemp = parseFloat(stepProperty.textContent)
                          break
                        case 'step_time':
                          step.time = parseFloat(stepProperty.textContent)
                          break
                        case 'decoction_amt':
                          step.waterRatio = parseFloat(stepProperty.textContent) / recipe.grainWeight()
                      }
                    }
                    mash.steps.push(step)
                  }
              }
            }
        }
      }
      recipes.push(recipe)
    }
    return recipes
  }

  Recette.Recipe.prototype.toBeerXml = function () {
    var fermentable
    var hop
    var i
    var j
    var k
    var l
    var len
    var len1
    var len2
    var len3
    var len4
    var m
    var misc
    var ref2
    var ref3
    var ref4
    var ref5
    var ref6
    var step
    var xml
    var yeast
    xml = '<?xml version="1.0" encoding="utf-8"?><recipes><recipe>'
    xml += '<version>1</version>'
    xml += '<name>' + this.name + '</name>'
    xml += '<brewer>' + this.author + '</brewer>'
    xml += '<batch_size>' + this.batchSize + '</batch_size>'
    xml += '<boil_size>' + this.boilSize + '</boil_size>'
    xml += '<efficiency>' + this.mashEfficiency + '</efficiency>'
    if (this.primaryDays) {
      xml += '<primary_age>' + this.primaryDays + '</primary_age>'
    }
    if (this.primaryTemp) {
      xml += '<primary_temp>' + this.primaryTemp + '</primary_temp>'
    }
    if (this.secondaryDays) {
      xml += '<secondary_age>' + this.secondaryDays + '</secondary_age>'
    }
    if (this.secondaryTemp) {
      xml += '<secondary_temp>' + this.secondaryTemp + '</secondary_temp>'
    }
    if (this.tertiaryDays) {
      xml += '<tertiary_age>' + this.tertiaryDays + '</tertiary_age>'
    }
    if (this.tertiaryTemp) {
      xml += '<tertiary_temp>' + this.tertiaryTemp + '</tertiary_temp>'
    }
    if (this.agingDays) {
      xml += '<age>' + this.agingDays + '</age>'
    }
    if (this.agingTemp) {
      xml += '<age_temp>' + this.agingTemp + '</age_temp>'
    }
    if (this.bottlingTemp) {
      xml += '<carbonation_temp>' + this.bottlingTemp + '</carbonation_temp>'
    }
    if (this.bottlingPressure) {
      xml += '<carbonation>' + this.bottlingPressure + '</carbonation>'
    }
    if (this.style) {
      console.log(this.style)
      xml += '<style><version>1</version>'
      if (this.style.name) {
        xml += '<name>' + this.style.name + '</name>'
      }
      if (this.style.category) {
        xml += '<category>' + this.style.category + '</category>'
      }
      xml += '<og_min>' + this.style.og[ 0 ] + '</og_min><og_max>' + this.style.og[ 1 ] + '</og_max>'
      xml += '<fg_min>' + this.style.fg[ 0 ] + '</fg_min><fg_max>' + this.style.fg[ 1 ] + '</fg_max>'
      xml += '<ibu_min>' + this.style.ibu[ 0 ] + '</ibu_min><ibu_max>' + this.style.ibu[ 1 ] + '</ibu_max>'
      xml += '<color_min>' + this.style.srm[ 0 ] + '</color_min><color_max>' + this.style.srm[ 1 ] + '</color_max>'
      xml += '<abv_min>' + this.style.abv[ 0 ] + '</abv_min><abv_max>' + this.style.abv[ 1 ] + '</abv_max>'
      xml += '<carb_min>' + this.style.carb[ 0 ] + '</carb_min><carb_max>' + this.style.carb[ 1 ] + '</carb_max>'
      xml += '</style>'
    }
    xml += '<fermentables>'
    ref2 = this.fermentables
    for (i = 0, len = ref2.length; i < len; i++) {
      fermentable = ref2[ i ]
      xml += '<fermentable><version>1</version>'
      xml += '<name>' + fermentable.name + '</name>'
      xml += '<type>' + (fermentable.type()) + '</type>'
      xml += '<weight>' + (fermentable.weight.toFixed(1)) + '</weight>'
      xml += '<yield>' + (fermentable[ 'yield' ].toFixed(1)) + '</yield>'
      xml += '<color>' + (fermentable.color.toFixed(1)) + '</color>'
      xml += '</fermentable>'
    }
    xml += '</fermentables>'
    xml += '<hops>'
    ref3 = this.spices.filter(item => item.aa > 0)
    for (j = 0, len1 = ref3.length; j < len1; j++) {
      hop = ref3[ j ]
      xml += '<hop><version>1</version>'
      xml += '<name>' + hop.name + '</name>'
      xml += '<time>' + hop.time + '</time>'
      xml += '<amount>' + hop.weight + '</amount>'
      xml += '<alpha>' + (hop.aa.toFixed(2)) + '</alpha>'
      xml += '<use>' + hop.use + '</use>'
      xml += '<form>' + hop.form + '</form>'
      xml += '</hop>'
    }
    xml += '</hops>'
    xml += '<yeasts>'
    ref4 = this.yeast
    for (k = 0, len2 = ref4.length; k < len2; k++) {
      yeast = ref4[ k ]
      xml += '<yeast><version>1</version>'
      xml += '<name>' + yeast.name + '</name>'
      xml += '<type>' + yeast.type + '</type>'
      xml += '<form>' + yeast.form + '</form>'
      xml += '<attenuation>' + yeast.attenuation + '</attenuation>'
      xml += '</yeast>'
    }
    xml += '</yeasts>'
    xml += '<miscs>'
    ref5 = this.spices.filter(item => item.aa === 0)
    for (l = 0, len3 = ref5.length; l < len3; l++) {
      misc = ref5[ l ]
      xml += '<misc><version>1</version>'
      xml += '<name>' + misc.name + '</name>'
      xml += '<time>' + misc.time + '</time>'
      xml += '<amount>' + misc.weight + '</amount>'
      xml += '<use>' + misc.use + '</use>'
      xml += '</misc>'
    }
    xml += '</miscs>'
    if (this.mash) {
      xml += '<mash><version>1</version>'
      xml += '<name>' + this.mash.name + '</name>'
      xml += '<grain_temp>' + this.mash.grainTemp + '</grain_temp>'
      xml += '<sparge_temp>' + this.mash.spargeTemp + '</sparge_temp>'
      xml += '<ph>' + this.mash.ph + '</ph>'
      xml += '<notes>' + this.mash.notes + '</notes>'
      xml += '<mash_steps>'
      ref6 = this.mash.steps
      for (m = 0, len4 = ref6.length; m < len4; m++) {
        step = ref6[ m ]
        xml += '<mash_step><version>1</version>'
        xml += '<name>' + step.name + '</name>'
        xml += '<description>' + (step.description(true, this.grainWeight())) + '</description>'
        xml += '<step_time>' + step.time + '</step_time>'
        xml += '<step_temp>' + step.temp + '</step_temp>'
        xml += '<end_temp>' + step.endTemp + '</end_temp>'
        xml += '<ramp_time>' + step.rampTime + '</ramp_time>'
        if (step.type === 'Decoction') {
          xml += '<decoction_amt>' + (step.waterRatio * this.grainWeight()) + '</decoction_amt>'
        } else {
          xml += '<infuse_amount>' + (step.waterRatio * this.grainWeight()) + '</infuse_amount>'
        }
        xml += '</mash_step>'
      }
      xml += '</mash_steps>'
      xml += '</mash>'
    }
    xml += '</recipe></recipes>'
    return xml
  }
}).call(this)
