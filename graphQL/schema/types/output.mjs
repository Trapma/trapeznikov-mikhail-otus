// подключаем типы
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

export const phoneType = new GraphQLObjectType({
  name: "Phone",
  description: "phone characteristics",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    brand: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    ssd: { type: new GraphQLNonNull(GraphQLInt) },
    manufacturedDeclaredColor: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString },
    warranty: { type: GraphQLString },
    madeIn: { type: GraphQLString },
    releaseYear: { type: GraphQLString },
    backPanelColor: { type: GraphQLString },
    frontPanelColor: { type: GraphQLString },
    edgeColor: { type: GraphQLString },
    g2: { type: GraphQLString },
    g3: { type: GraphQLString },
    g4: { type: GraphQLString },
    g5: { type: GraphQLString },
    formatSIM: { type: GraphQLString },
    amountSIM: { type: GraphQLString },
    eSIM: { type: GraphQLString },
    screenInch: { type: GraphQLString },
    screenResolution: { type: GraphQLString },
    screenpixelDensity: { type: GraphQLString },
    screenManufacturingTehnology: { type: GraphQLString },
    screenColorsNumber: { type: GraphQLString },
    screenRefreshRate: { type: GraphQLString },
    material: { type: GraphQLString },
    osVersion: { type: GraphQLString },
    numberMainCameras: { type: GraphQLString },
    numberOfMegapixelsMainCameras: { type: GraphQLString },
    ShootingModes: { type: GraphQLString },
    headphonesIncluded: { type: GraphQLString },
    title: {
      type: GraphQLString,
      resolve(phone) {
        return `${phone.screenInch} ${phone.type} ${phone.brand} ${phone.model} ${phone.ssd} ${phone.manufacturedDeclaredColor}`;
      },
    },
    rating: {
      type: new GraphQLList(ratingType),
      resolve(phone, args) {
        return ratings.filter((rating) => rating.phone_id === phone.id);
      },
    },
  }),
});

export const ratingType = new GraphQLObjectType({
  name: "Rating",
  fields: () => ({
    id: { type: GraphQLID },
    overallScore: { type: GraphQLInt },
    experienceUse: { type: GraphQLString },
    appearance: { type: GraphQLInt },
    perfomance: { type: GraphQLInt },
    camera: { type: GraphQLInt },
    soundQuality: { type: GraphQLInt },
    battery: { type: GraphQLInt },
    dateOfCreation: { type: GraphQLString },
    advantages: { type: GraphQLString },
    disadvantages: { type: GraphQLString },
    comment: { type: GraphQLString },
    user: {
      type: userType,
      resolve(rating, args) {
        return users.find((user) => user.id === rating.user_id);
      },
    },
    phone: {
      type: phoneType,
      resolve(parent, args) {
        return phones.find((phone) => phone.id === parent.phone_id);
      },
    },
  }),
});

export const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve(user) {
        return user.firstName + " " + user.lastName;
      },
    },
    email: { type: GraphQLString },
    phone: { type: GraphQLInt },
    age: { type: GraphQLInt },
    comments: {
      type: new GraphQLList(ratingType),
      resolve(user, args) {
        return ratings.filter((rating) => rating.user_id === user.id);
      },
    },
  }),
});
