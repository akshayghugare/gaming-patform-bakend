import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../../../config/db";

/**
 * One player's standing in one tournament. Tournaments are authored in the
 * gamification `tournaments` table; the actual gameplay happens on the games
 * platform, which pushes scores here (clientAuth) so the backoffice can show
 * the same leaderboard the players see.
 */
export class TournamentScore extends Model<
  InferAttributes<TournamentScore>,
  InferCreationAttributes<TournamentScore>
> {
  declare id: CreationOptional<string>;
  declare tournament_id: string;
  declare player_id: CreationOptional<string | null>;
  declare email: string;
  declare player_name: CreationOptional<string | null>;
  declare score: CreationOptional<number>;
  declare readonly created_at: CreationOptional<Date>;
  declare readonly updated_at: CreationOptional<Date>;
}

TournamentScore.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tournament_id: { type: DataTypes.UUID, allowNull: false },
    player_id: { type: DataTypes.UUID, allowNull: true },
    email: { type: DataTypes.STRING(180), allowNull: false },
    player_name: { type: DataTypes.STRING(180), allowNull: true },
    score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "tournament_scores",
    modelName: "TournamentScore",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      { unique: true, fields: ["tournament_id", "email"] },
      { fields: ["tournament_id"] },
    ],
  }
);

export default TournamentScore;
