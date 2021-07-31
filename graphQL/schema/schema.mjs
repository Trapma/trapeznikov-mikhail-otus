// подключаем типы
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  graphql,
  GraphQLInputObjectType,
} from "graphql";

// подключаем данные
import { phones, ratings, users } from "../data/data.mjs";

const userType = new GraphQLObjectType({
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

const phoneType = new GraphQLObjectType({
  name: "Phone",
  description: "phone characteristics",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    brand: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: new GraphQLNonNull(GraphQLInt) },
    title: {
      type: GraphQLString,
      resolve(phone) {
        return `${phone.screenInch} ${phone.type} ${phone.brand} ${phone.model} ${phone.ssd} ${phone.manufacturedDeclaredColor}`;
      },
    },
    description: { type: GraphQLString },
    warranty: { type: GraphQLString },
    madeIn: { type: GraphQLString },
    releaseYear: { type: GraphQLString },
    backPanelColor: { type: GraphQLString },
    frontPanelColor: { type: GraphQLString },
    edgeColor: { type: GraphQLString },
    manufacturedDeclaredColor: { type: new GraphQLNonNull(GraphQLInt) },
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
    ssd: { type: new GraphQLNonNull(GraphQLInt) },
    numberMainCameras: { type: GraphQLString },
    numberOfMegapixelsMainCameras: { type: GraphQLString },
    ShootingModes: { type: GraphQLString },
    headphonesIncluded: { type: GraphQLString },
    rating: {
      type: new GraphQLList(ratingType),
      resolve(phone, args) {
        return ratings.filter((rating) => rating.phone_id === phone.id);
      },
    },
  }),
});

const ratingType = new GraphQLObjectType({
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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "what get info to you need?",
  fields: {
    phones: {
      description: "return all phones",
      type: GraphQLList(phoneType),
      resolve() {
        console.log("test", phones);
        return phones;
      },
    },
    users: {
      description: "return all users",
      type: GraphQLList(userType),
      resolve() {
        return users;
      },
    },
    ratings: {
      description: "return all ratings",
      type: GraphQLList(ratingType),
      resolve() {
        return ratings;
      },
    },

    phone: {
      description: "find phone info on id",
      type: phoneType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return phones.find((phone) => phone.id === args.id);
      },
    },
    user: {
      description: "find user info on id",
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return users.find((user) => user.id === args.id);
      },
    },
    positiveRatings: {
      description: "find all positive ratings on phone_id",
      type: GraphQLList(ratingType),
      args: {
        phone_id: { type: GraphQLID },
        overallScore: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return ratings.filter(
          (ratings) =>
            ratings.phone_id === args.phone_id &&
            ratings.overallScore === args.overallScore
        );
      },
    },
  },
});


const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        firstName: { type:new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type:new GraphQLNonNull(GraphQLString)  },
        phone: { type:new GraphQLNonNull(GraphQLInt)  },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let user = {
          id: args.id,
          username: args.username,
          firstName: args.firstName,
          lastName: args.lastName,
          fullName: args.fullName,
          email: args.email,
          phone: args.phone,
          age: args.age,
          comments: args.comments,
        };
        //из за локальной бд напишем проверку на id
        if (users.find((user) => user.id === args.id)) {
          return console.error("duplicate id");
        }
        users.push(user);
        return users.find((user) => user.id === args.id);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
