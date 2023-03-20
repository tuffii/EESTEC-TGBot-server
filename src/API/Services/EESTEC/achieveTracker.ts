import * as ServerCore from "@var3n1k/server-core"
import * as GlobalModule from "../../../module.js"
import * as PostgreSQLEESTECTables from "../../../DataBase/PostgreSQL/DataBase/EESTEC/Tables/__tables.js"

type EESTECAchieveTrackerInput = PostgreSQLEESTECTables.achieveTracker.Input
type EESTECAchieveTrackerOutput = PostgreSQLEESTECTables.achieveTracker.Output

interface EESTECAchieveTrackerSearch {
  id?: EESTECAchieveTrackerOutput[`id`] | undefined
  personName?: EESTECAchieveTrackerOutput[`personName`] | undefined
  achieveID?: EESTECAchieveTrackerOutput[`achieveID`] | undefined
}

const Validator = ServerCore.Engine.Module.Classes.Validator

const EESTECAchieveTrackerSearchValidator = new Validator().Default.Object()
  .Required()
  .Exact({
    id: new Validator().Default.Numeric().Number().Integer().Min(1),
    personNAme: new Validator().Default.String().MinLength(1),
    achieveID: new Validator().Default.Numeric().Number().Integer().Min(1),
  })

const EESTECAchieveTrackerIputValidator = new Validator().Default.Object()
  .Required()
  .Exact({
    personNAme: new Validator().Default.String().MinLength(1),
    achieveID: new Validator().Default.Numeric().Number().Integer().Min(1),
  })

const EESTECAchieveTrackerOutputValidator = new Validator().Default.Object()
  .Required()
  .Exact({
    id: new Validator().Default.Numeric().Number().Integer().Min(1),
    personNAme: new Validator().Default.String().MinLength(1),
    achieveID: new Validator().Default.Numeric().Number().Integer().Min(1),
  })

interface ValidationResult {
  readonly Status: boolean
  readonly Error: {
    readonly Message: string
  }
}

export default class AchieveTrackerService {
  public static async Get(searchParameters: EESTECAchieveTrackerSearch): Promise<Array<EESTECAchieveTrackerOutput>> {
    const Validator = ServerCore.Engine.Module.Classes.Validator
    Validator.Strict(searchParameters, EESTECAchieveTrackerSearchValidator)

    const IDToSearch = searchParameters.id
    const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
    const personNameSearch = searchParameters.personName
    const IspersonNameExist = !Validator.TypeGuard.Default.IsUndefined(personNameSearch)
    const AchieveTrackerIDSearch = searchParameters.achieveID
    const IsAchieveTrackerIDExist = !Validator.TypeGuard.Default.IsUndefined(AchieveTrackerIDSearch)

    const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
    const EESTECAchieveTrackerTable = EESTECDataBase.Tables.achieve_tracker

    const EESTECAchieveTrackerMatchConditions: Array<string> = []

    if (IsIDToSearchExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`id`, IDToSearch))
    if (IspersonNameExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`personName`, personNameSearch))
    if (IsAchieveTrackerIDExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`achieveID`, AchieveTrackerIDSearch))

    const EESTECAchieveTrackerMatchCondition = EESTECAchieveTrackerTable.Condition.Multiple.Every(...EESTECAchieveTrackerMatchConditions)

    const MatchedEESTECAchieveTrackers = await EESTECAchieveTrackerTable.Select(undefined, EESTECAchieveTrackerMatchCondition, false, undefined)

    return MatchedEESTECAchieveTrackers
  }

  public static async DoesExist(searchParameters: EESTECAchieveTrackerSearch): Promise<boolean> {
    const Validator = ServerCore.Engine.Module.Classes.Validator
    Validator.Strict(searchParameters, EESTECAchieveTrackerSearchValidator)

    const MatchedEESTECAchieveTracker = await AchieveTrackerService.Get(searchParameters)
    const IsMatchedEESTECAchieveTrackerExist = !Validator.TypeGuard.Default.IsEmptyArray(MatchedEESTECAchieveTracker)

    return IsMatchedEESTECAchieveTrackerExist
  }

  public static async Create(newAchieveTracker: EESTECAchieveTrackerInput): Promise<EESTECAchieveTrackerOutput> {
    const Validator = ServerCore.Engine.Module.Classes.Validator
    Validator.Strict(newAchieveTracker, EESTECAchieveTrackerIputValidator)

    const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
    const EESTECAchieveTrackerTable = EESTECDataBase.Tables.achieve_tracker

    const MatchedEESTECAchieveTracker = await AchieveTrackerService.Get(newAchieveTracker)

    Validator.Strict(MatchedEESTECAchieveTracker, new Validator().Default.Array().Required().Of(EESTECAchieveTrackerOutputValidator).Length(0))

    const [CreatedEESTECAchieveTracker] = await EESTECAchieveTrackerTable.Insert(newAchieveTracker)
    return CreatedEESTECAchieveTracker
  }

  public static async Update(searchParameters: EESTECAchieveTrackerSearch, newParameters: EESTECAchieveTrackerOutput): Promise<EESTECAchieveTrackerOutput> {
    const Validator = ServerCore.Engine.Module.Classes.Validator
    Validator.Strict(searchParameters, EESTECAchieveTrackerSearchValidator)

    const IDToSearch = searchParameters.id
    const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
    const personNameSearch = searchParameters.personName
    const IspersonNameExist = !Validator.TypeGuard.Default.IsUndefined(personNameSearch)
    const AchieveTrackerIDSearch = searchParameters.achieveID
    const IsAchieveTrackerIDExist = !Validator.TypeGuard.Default.IsUndefined(AchieveTrackerIDSearch)

    const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
    const EESTECAchieveTrackerTable = EESTECDataBase.Tables.achieve_tracker

    const EESTECAchieveTrackerMatchConditions: Array<string> = []
    if (IsIDToSearchExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`id`, IDToSearch))
    if (IspersonNameExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`personName`, personNameSearch))
    if (IsAchieveTrackerIDExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`achieveID`, AchieveTrackerIDSearch))

    const EESTECAchieveTrackerMatchCondition = EESTECAchieveTrackerTable.Condition.Multiple.Every(...EESTECAchieveTrackerMatchConditions)
    const MatchedEESTECAchieveTrackers = await AchieveTrackerService.Get(searchParameters)
    Validator.Strict(MatchedEESTECAchieveTrackers, new Validator().Default.Array().Required().Of(EESTECAchieveTrackerOutputValidator).Length(1))

    const NewEESTECAchieveTrackerSetters: Array<string> = []
    NewEESTECAchieveTrackerSetters.push(EESTECAchieveTrackerTable.ValueSetter.Single(`id`, newParameters.id))
    NewEESTECAchieveTrackerSetters.push(EESTECAchieveTrackerTable.ValueSetter.Single(`AchieveTrackerName`, newParameters.personName))
    NewEESTECAchieveTrackerSetters.push(EESTECAchieveTrackerTable.ValueSetter.Single(`privilegeID`, newParameters.achieveID))

    const NewEESTECAchieveTrackerSetter = EESTECAchieveTrackerTable.ValueSetter.Multiple(...NewEESTECAchieveTrackerSetters)
    const [UpdatedEESTECAchieveTracker] = await EESTECAchieveTrackerTable.Update(NewEESTECAchieveTrackerSetter, EESTECAchieveTrackerMatchCondition)
    return UpdatedEESTECAchieveTracker
  }

  public static async Delete(searchParameters: EESTECAchieveTrackerSearch): Promise<EESTECAchieveTrackerOutput> {
    const Validator = ServerCore.Engine.Module.Classes.Validator
    Validator.Strict(searchParameters, EESTECAchieveTrackerSearchValidator)

    const IDToSearch = searchParameters.id
    const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
    const personNameSearch = searchParameters.personName
    const IspersonNameExist = !Validator.TypeGuard.Default.IsUndefined(personNameSearch)
    const AchieveTrackerIDSearch = searchParameters.achieveID
    const IsAchieveTrackerIDExist = !Validator.TypeGuard.Default.IsUndefined(AchieveTrackerIDSearch)

    const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
    const EESTECAchieveTrackerTable = EESTECDataBase.Tables.achieve_tracker

    const EESTECAchieveTrackerMatchConditions: Array<string> = []
    if (IsIDToSearchExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`id`, IDToSearch))
    if (IspersonNameExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`personName`, personNameSearch))
    if (IsAchieveTrackerIDExist) EESTECAchieveTrackerMatchConditions.push(EESTECAchieveTrackerTable.Condition.Single.EqualTo(`achieveID`, AchieveTrackerIDSearch))

    const EESTECRoleMatchCondition = EESTECAchieveTrackerTable.Condition.Multiple.Every(...EESTECAchieveTrackerMatchConditions)
    const MatchedEESTECRole = await AchieveTrackerService.Get(searchParameters)
    Validator.Strict(MatchedEESTECRole, new Validator().Default.Array().Required().Of(EESTECAchieveTrackerOutputValidator).Length(1))

    const [DeletedEESTECRole] = await EESTECAchieveTrackerTable.Delete(EESTECRoleMatchCondition)

    return DeletedEESTECRole
  }
}
