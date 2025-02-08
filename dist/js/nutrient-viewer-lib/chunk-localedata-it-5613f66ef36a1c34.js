/*!
 * Nutrient Web SDK 1.0.0 (https://www.nutrient.io/sdk/web)
 *
 * Copyright (c) 2016-2025 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://www.nutrient.io/legal/acknowledgements/web-acknowledgements/
 */
(globalThis.webpackChunkNutrientViewer=globalThis.webpackChunkNutrientViewer||[]).push([[6817],{25981:()=>{Intl.PluralRules&&"function"==typeof Intl.PluralRules.__addLocaleData&&Intl.PluralRules.__addLocaleData({data:{categories:{cardinal:["one","many","other"],ordinal:["many","other"]},fn:function(a,e){var l=String(a),t=l.split(/[ce]/),n=t[1]||0,r=String(n?Number(t[0])*Math.pow(10,n):l).split("."),i=r[0],o=!r[1],u=i.slice(-6);return e?11==a||8==a||80==a||800==a?"many":"other":1==a&&o?"one":0==n&&0!=i&&0==u&&o||n<0||n>5?"many":"other"}},locale:"it"})}}]);