import * as ServerCore from '@var3n1k/server-core'
import * as GlobalModule from '../../../module.js'
import * as PostgreSQLEESTECTables from '../../../DataBase/PostgreSQL/DataBase/EESTEC/Tables/__tables.js'


type EESTECRoleInput = PostgreSQLEESTECTables.roleSettings.Input
type EESTECRoleOutput = PostgreSQLEESTECTables.roleSettings.Output


interface EESTECRoleSearch {
    id?: EESTECRoleOutput[`id`] | undefined,
    roleName?: EESTECRoleOutput[`roleName`] | undefined,
    privilegeID?: EESTECRoleOutput[`privilegeID`] | undefined,
    parametr?: EESTECRoleOutput[`parametr`] | undefined
}
const Validator = ServerCore.Engine.Module.Classes.Validator

const EESTECRoleSearchValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.Numeric().Number().Integer().Min(1),
    roleName: new Validator().Default.String().MinLength(1),
    privilegeID: new Validator().Default.Numeric().Number().Integer().Min(1),
    parametr: new Validator().Default.Any()
})
const EESTECRoleInputValidator = new Validator().Default.Object().Required().Exact({
    roleName: new Validator().Default.String().MinLength(1),
    privilegeID: new Validator().Default.Numeric().Number().Integer().Min(1),
    parametr: new Validator().Default.Any()
})
const EESTECRoleOutputValidator = new Validator().Default.Object().Required().Exact({
    id: new Validator().Default.Numeric().Number().Integer().Min(1),
    roleName: new Validator().Default.String().MinLength(1),
    privilegeID: new Validator().Default.Numeric().Number().Integer().Min(1),
    parametr: new Validator().Default.Any()
})
interface ValidationResult {
    readonly Status: boolean
    readonly Error: {
        readonly Message: string
    }
}

export default class RoleService {

    public static async Get(searchParameters: EESTECRoleSearch): Promise<Array<EESTECRoleOutput>> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECRoleSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const roleNameSearch = searchParameters.roleName
        const IsRoleNameExist = !Validator.TypeGuard.Default.IsUndefined(roleNameSearch)
        const privilegeIDSearch = searchParameters.privilegeID
        const IsPrivilegeIDExist = !Validator.TypeGuard.Default.IsUndefined(privilegeIDSearch)
        const parametrSearch = searchParameters.parametr
        const IsParametrExist = !Validator.TypeGuard.Default.IsUndefined(parametrSearch)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECRoleTable = EESTECDataBase.Tables.rolesSettings

        const EESTECRoleMatchConditions: Array<string> = []

        if(IsIDToSearchExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if(IsRoleNameExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`roleName`, roleNameSearch))
        if(IsPrivilegeIDExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`privilegeID`, privilegeIDSearch))
        if(IsParametrExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`parametr`, parametrSearch))

        const EESTECRoleMatchCondition = EESTECRoleTable.Condition.Multiple.Every(...EESTECRoleMatchConditions)

        const MatchedEESTECRoles = await EESTECRoleTable.Select(undefined, EESTECRoleMatchCondition, false, undefined)

        return MatchedEESTECRoles
    }

    public static async DoesExist(searchParameters: EESTECRoleSearch): Promise<boolean> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECRoleSearchValidator)

        const MatchedEESTECRoles = await RoleService.Get(searchParameters)
        const IsMatchedEESTECRoleExist = !Validator.TypeGuard.Default.IsEmptyArray(MatchedEESTECRoles)

        return IsMatchedEESTECRoleExist
    }

    public static async Create(newRole: EESTECRoleInput): Promise<EESTECRoleOutput> {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(newRole, EESTECRoleInputValidator)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECRoleTable = EESTECDataBase.Tables.rolesSettings

        const MatchedEESTECRoles = await RoleService.Get(newRole)

        Validator.Strict(MatchedEESTECRoles, new Validator().Default.Array().Required().Of(EESTECRoleOutputValidator).Length(0))

        const [CreatedEESTECRole] = await EESTECRoleTable.Insert(newRole)
        return CreatedEESTECRole
    }

    public static async Update(searchParameters: EESTECRoleSearch, newParameters: EESTECRoleOutput): Promise<EESTECRoleOutput> {
    
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECRoleSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const roleNameSearch = searchParameters.roleName
        const IsRoleNameExist = !Validator.TypeGuard.Default.IsUndefined(roleNameSearch)
        const privilegeIDSearch = searchParameters.privilegeID
        const IsPrivilegeIDExist = !Validator.TypeGuard.Default.IsUndefined(privilegeIDSearch)
        const parametrSearch = searchParameters.parametr
        const IsParametrExist = !Validator.TypeGuard.Default.IsUndefined(parametrSearch)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECRoleTable = EESTECDataBase.Tables.rolesSettings

        const EESTECRoleMatchConditions: Array<string> = []
        if(IsIDToSearchExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if(IsRoleNameExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`roleName`, roleNameSearch))
        if(IsPrivilegeIDExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`privilegeID`, privilegeIDSearch))
        if(IsParametrExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`parametr`, parametrSearch))

        const EESTECRoleMatchCondition = EESTECRoleTable.Condition.Multiple.Every(...EESTECRoleMatchConditions)
        const MatchedEESTECRoles = await RoleService.Get(searchParameters)
        Validator.Strict(MatchedEESTECRoles, new Validator().Default.Array().Required().Of(EESTECRoleOutputValidator).Length(1))

        const NewEESTECRoleSetters: Array<string> = []
        NewEESTECRoleSetters.push(EESTECRoleTable.ValueSetter.Single(`id`, newParameters.id))
        NewEESTECRoleSetters.push(EESTECRoleTable.ValueSetter.Single(`roleName`, newParameters.roleName))
        NewEESTECRoleSetters.push(EESTECRoleTable.ValueSetter.Single(`privilegeID`, newParameters.privilegeID))
        NewEESTECRoleSetters.push(EESTECRoleTable.ValueSetter.Single(`parametr`, newParameters.parametr))

        const NewEESTECRoleSetter = EESTECRoleTable.ValueSetter.Multiple(...NewEESTECRoleSetters)
        const [UpdatedEESTECRole] = await EESTECRoleTable.Update(NewEESTECRoleSetter, EESTECRoleMatchCondition)
        return UpdatedEESTECRole
    }

    public static async Delete(searchParameters: EESTECRoleSearch): Promise<EESTECRoleOutput> {
        
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(searchParameters, EESTECRoleSearchValidator)

        const IDToSearch = searchParameters.id
        const IsIDToSearchExist = !Validator.TypeGuard.Default.IsUndefined(IDToSearch)
        const roleNameSearch = searchParameters.roleName
        const IsRoleNameExist = !Validator.TypeGuard.Default.IsUndefined(roleNameSearch)
        const privilegeIDSearch = searchParameters.privilegeID
        const IsPrivilegeIDExist = !Validator.TypeGuard.Default.IsUndefined(privilegeIDSearch)
        const parametrSearch = searchParameters.parametr
        const IsParametrExist = !Validator.TypeGuard.Default.IsUndefined(parametrSearch)

        const EESTECDataBase = GlobalModule.DataBase.PostgreSQL.DataBases.EESTEC
        const EESTECRoleTable = EESTECDataBase.Tables.rolesSettings
        
        const EESTECRoleMatchConditions: Array<string> = []
        if(IsIDToSearchExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`id`, IDToSearch))
        if(IsRoleNameExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`roleName`, roleNameSearch))
        if(IsPrivilegeIDExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`privilegeID`, privilegeIDSearch))
        if(IsParametrExist) EESTECRoleMatchConditions.push(EESTECRoleTable.Condition.Single.EqualTo(`parametr`, parametrSearch))

        const EESTECRoleMatchCondition = EESTECRoleTable.Condition.Multiple.Every(...EESTECRoleMatchConditions)
        const MatchedEESTECRole = await RoleService.Get(searchParameters)
        Validator.Strict(MatchedEESTECRole, new Validator().Default.Array().Required().Of(EESTECRoleOutputValidator).Length(1))

        const [DeletedEESTECRole] = await EESTECRoleTable.Delete(EESTECRoleMatchCondition)

        return DeletedEESTECRole
    }
}