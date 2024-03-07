import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, ModelStatic, Sequelize } from "sequelize";
import { getUUID } from "../../utils/uuid";

export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    declare uuid: CreationOptional<string>;
    declare sender: CreationOptional<string>;
    declare message: string;

    declare read: CreationOptional<boolean>;
    declare readAt: CreationOptional<number>;
}

export default (sequelize: Sequelize): ModelStatic<Message> => {
    return Message.init(
        {
            uuid: {
                type: DataTypes.STRING,
                primaryKey: true,
                defaultValue: () => getUUID(),
            },

            sender: DataTypes.STRING,
            message: DataTypes.STRING,

            read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            readAt: {
                type: DataTypes.DATE,
                defaultValue: null
            }
        },
        {
            sequelize,
        });
}