import * as ServerCore from "@var3n1k/server-core"
import * as GlobalModule from "../../../module.js"
import * as PostgreSQLEESTECTables from "../../../DataBase/PostgreSQL/DataBase/EESTEC/Tables/__tables.js"

type EESTECAchievementOutput = PostgreSQLEESTECTables.achievements.Output

interface EESTECAchievementSearch {
  id?: EESTECAchievementOutput[`id`] | undefined
  achievement?: EESTECAchievementOutput[`achievement`] | undefined
}

const Validator = ServerCore.Engine.Module.Classes.Validator

const EESTECAchievementSearchValidator = new Validator().Default.Object()
  .Required()
  .Exact({
    id: new Validator().Default.Numeric().Number().Integer().Min(1),
    privilege: new Validator().Default.String().MinLength(1),
  })

export default class AchievementService {
  public static async Get(searchParameters: EESTECAchievementSearch): Promise<Array<EESTECAchievementOutput>> {
    const Validator = ServerCore.Engine.Module.Classes.Validator

    Validator.Strict(searchParameters, EESTECAchievementSearchValidator)
    const IDToSearch = searchParameters.id
    const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
    const AchievementSearch = searchParameters.achievement
    const IsAchievementsSeatchExist = !Validator.TypeGuard.Default.IsUndefined(AchievementSearch)

    const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
    const EESTECAchievementsTable = EESTECDataBase.Table.achievement

    const EESTECAchievementArr: Array<string> = []
    if (IsIDToSearchExist) EESTECAchievementArr.push(EESTECAchievementsTable.Condition.Single.EqualTo(`id`, IDToSearch))
    if (IsAchievementsSeatchExist) EESTECAchievementsTable.push(EESTECAchievementsTable.Condition.Single.EqualTo(`achievements`))

    const EESTECAchievementsArray = EESTECAchievementsTable.Condition.Multiple.Every(...EESTECAchievementArr)

    const MatchedEESTECAchievements = await EESTECAchievementsTable.Select(undefined, EESTECAchievementsArray, false, undefined)

    return MatchedEESTECAchievements
  }

  public static async DoesExist(searchParameters: EESTECAchievementSearch): Promise<boolean> {
    const Validator = ServerCore.Engine.Module.Classes.Validator
    Validator.Strict(searchParameters, EESTECAchievementSearchValidator)

    const MatchedEESTECAchievement = await AchievementService.Get(searchParameters)
    const IsMatchedEESTECAchievementExist = !Validator.TypeGuard.Default.IsEmptyArray(MatchedEESTECAchievement)

    return IsMatchedEESTECAchievementExist
  }
}
