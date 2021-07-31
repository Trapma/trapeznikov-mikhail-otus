// подключаем типы
import {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLBoolean
  } from "graphql";

export const inputUserType = new GraphQLInputObjectType({
    name:"UserInput",
    description: "user data for input",
    fields: () => ({
      id: {type: new GraphQLNonNull(GraphQLID)},
      username: { type: new GraphQLNonNull(GraphQLString)  },
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString)},
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLInt) },
      age: { type: new GraphQLNonNull(GraphQLInt) },
    })
  })

export const inputPhoneType = new GraphQLInputObjectType({
    name: "PhoneInput",
    description: "phone data for input",
    fields: () => ({

    id: { type: new GraphQLNonNull(GraphQLID) },
    brand: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    ssd: { type: new GraphQLNonNull(GraphQLInt) },
    manufacturedDeclaredColor: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    warranty: { type: new GraphQLNonNull(GraphQLString) },
    madeIn: { type: new GraphQLNonNull(GraphQLString) },
    releaseYear: { type: new GraphQLNonNull(GraphQLString) },
    backPanelColor: { type: new GraphQLNonNull(GraphQLString) },
    frontPanelColor: { type: new GraphQLNonNull(GraphQLString) },
    edgeColor: { type: new GraphQLNonNull(GraphQLString) },
    g2: { type: new GraphQLNonNull(GraphQLString) },
    g3: { type: new GraphQLNonNull(GraphQLString) },
    g4: { type: new GraphQLNonNull(GraphQLString) },
    g5: { type: new GraphQLNonNull(GraphQLString) },
    formatSIM: { type: new GraphQLNonNull(GraphQLString) },
    amountSIM: { type: new GraphQLNonNull(GraphQLString) },
    eSIM: { type: new GraphQLNonNull(GraphQLString) },
    screenInch: { type: new GraphQLNonNull(GraphQLString) },
    screenResolution: { type: new GraphQLNonNull(GraphQLString) },
    screenpixelDensity: { type: new GraphQLNonNull(GraphQLString) },
    screenManufacturingTehnology: { type: new GraphQLNonNull(GraphQLString) },
    screenColorsNumber: { type: new GraphQLNonNull(GraphQLString) },
    screenRefreshRate: { type: new GraphQLNonNull(GraphQLString) },
    material: { type: new GraphQLNonNull(GraphQLString) },
    osVersion: { type: new GraphQLNonNull(GraphQLString) },
    numberMainCameras: { type: new GraphQLNonNull(GraphQLString) },
    numberOfMegapixelsMainCameras: { type: new GraphQLNonNull(GraphQLString) },
    ShootingModes: { type: new GraphQLNonNull(GraphQLString) },
    headphonesIncluded: { type: new GraphQLNonNull(GraphQLBoolean) },
    })
})
