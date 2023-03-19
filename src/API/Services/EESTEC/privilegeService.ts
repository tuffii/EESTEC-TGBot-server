import * as ServerCore from '@var3n1k/server-core'
import * as GlobalModule from '../../../module.js'
import * as PostgreSQLEESTECTables from '../../../DataBase/PostgreSQL/DataBase/EESTEC/Tables/__tables.js'


//type EESTECPrivilegeInput = PostgreSQLEESTECTables.privilege.Input
/* ///unUsed 
const EESTECPrivilegeInputValidator = new Validator().Default.Object().Required().Exact({
    privilege: new Validator().Default.String().MinLength(1)
})
const EESTECPrivilegeoutputValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.Numeric().Number().Integer().Min(1),
    privilege: new Validator().Default.String().MinLength(1)
})
interface ValidationResult {
    readonly Status: boolean
    readonly Error: {
        readonly Message: string
    }
}
*/

type EESTECPrivilegeOutput = PostgreSQLEESTECTables.privilege.Output

interface EESTECPrivilegeSearch {
    id?: EESTECPrivilegeOutput[`id`] | undefined,
   privilege?: EESTECPrivilegeOutput[`privilege`] | undefined
}
const Validator = ServerCore.Engine.Module.Classes.Validator

const EESTECPrivilegeSearchValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.Numeric().Number().Integer().Min(1),
    privilege: new Validator().Default.String().MinLength(1)
})

export default class PrivilegeService {

    public static async Get(searchParameters: EESTECPrivilegeSearch): Promise<Array<EESTECPrivilegeOutput>> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECPrivilegeSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const privilegeToSearch = searchParameters.privilege
        const IsPrivilegeToSearchExist = !Validator.TypeGuard.Default.IsUndefined(privilegeToSearch)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECPrivilegeTable = EESTECDataBase.Tables.privilege

        const EESTECPrivilegeMatchConditions: Array<string> = []
        if (IsIDToSearchExist) EESTECPrivilegeMatchConditions.push(EESTECPrivilegeTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if (IsPrivilegeToSearchExist) EESTECPrivilegeMatchConditions.push(EESTECPrivilegeTable.Condition.Single.EqualTo(`privilege`, privilegeToSearch))
        
        const EESTECPrivilegeMatchCondition = EESTECPrivilegeTable.Condition.Multiple.Every(...EESTECPrivilegeMatchConditions)
        const MatchedEESTECPrivileges = await EESTECPrivilegeTable.Select(undefined, EESTECPrivilegeMatchCondition, false, undefined)
        return MatchedEESTECPrivileges
    }

    public static async DoesExist(searchParameters: EESTECPrivilegeSearch): Promise<boolean> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECPrivilegeSearchValidator)

        const MatchedEESTECPrivileges = await PrivilegeService.Get(searchParameters)
        const IsMatchedEESTECPrivilegeExist = !Validator.TypeGuard.Default.IsEmptyArray(MatchedEESTECPrivileges)

        return IsMatchedEESTECPrivilegeExist
    }
}
