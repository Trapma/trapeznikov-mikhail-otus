// подключаем данные
import { phones, ratings, users } from "../data/data.mjs";
// подключаем типы
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from "graphql";

// подключаем типы
import { userType, ratingType, phoneType } from "./types/output.mjs";



export const queryType = new GraphQLObjectType({
  name: "RootQueryType",
  description: "what get info to you need?",
  fields: {
    phones: {
      description: "return all phones",
      type: GraphQLList(phoneType),
      resolve() {
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
