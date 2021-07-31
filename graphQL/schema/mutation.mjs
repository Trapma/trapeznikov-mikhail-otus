//подключаем данные
import { phones, users } from "../data/data.mjs";
//подключаем типы
import { userType, phoneType } from "./types/output.mjs";
import { inputUserType, inputPhoneType } from "./types/input.mjs";
import {GraphQLObjectType} from "graphql";

export const mutationType = new GraphQLObjectType({
    name: "Mutations",
    fields: {
      addUser: {
        type: userType,
        args: {
          input: { type: inputUserType },
        },
        resolve: (parent, args) => {
          let user = {
            id: args.input.id,
            username: args.input.username,
            firstName: args.input.firstName,
            lastName: args.input.lastName,
            email: args.input.email,
            phone: args.input.phone,
            age: args.input.age,
          };

          //из-за отсутсвия бд напишем проверку на id
          if (users.find((user) => user.id === args.input.id)) {
            return console.error("duplicate id");
          }
          users.push(user);

          return users.find((user) => user.id === args.input.id);
        },
      },
      addPhone: {
        type: phoneType,
        args: {
          input: {type: inputPhoneType}
        },
        resolve: (parent, args) => {
          let phone = {
            id: args.input.id,
            brand: args.input.brand,
            model: args.input.model,
            price: args.input.price,
            type: args.input.type,
            ssd: args.input.ssd,
            manufacturedDeclaredColor: args.input.manufacturedDeclaredColor,
            description: args.input.description,
            warranty: args.input.warranty,
            madeIn: args.input.madeIn,
            releaseYear: args.input.releaseYear,
            backPanelColor: args.input.backPanelColor,
            frontPanelColor: args.input.frontPanelColor,
            edgeColor: args.input.edgeColor,
            g2: args.input.g2,
            g3: args.input.g3,
            g4: args.input.g4,
            g5: args.input.g5,
            formatSIM: args.input.formatSIM,
            amountSIM: args.input.amountSIM,
            eSIM: args.input.eSIM,
            screenInch: args.input.screenInch,
            screenResolution: args.input.screenResolution,
            screenpixelDensity: args.input.screenpixelDensity,
            screenManufacturingTehnology: args.input.screenManufacturingTehnology,
            screenColorsNumber: args.input.screenColorsNumber,
            screenRefreshRate: args.input.screenRefreshRate,
            material: args.input.material,
            osVersion: args.input.osVersion,
            numberMainCameras: args.input.numberMainCameras,
            numberOfMegapixelsMainCameras: args.input.numberOfMegapixelsMainCameras,
            ShootingModes: args.input.ShootingModes,
            headphonesIncluded: args.input.headphonesIncluded,
          };
          //из-за отсутсвия бд напишем проверку на id
          if (phones.find(phone => phone.id === args.input.id)){
            return console.error("duplicate id")
          }
          phones.push(phone)

          return phones.find(phone => phone.id === args.input.id)
        },
      },
    },
  });
