// ملف التصدير الرئيسي لجميع الموديولات

// موديل إدارة المستشفى
export * from './01-hospital'

// موديل التعريفات العامة
export * from './02-GeneralDefinition'

// إعادة تصدير المكونات الرئيسية
export { default as HospitalModule } from './01-hospital/page'
export { default as GeneralDefinitionsModule } from './02-GeneralDefinition/page'

// إعادة تصدير التخطيطات
export { default as HospitalLayout } from './01-hospital/layout'
export { default as GeneralDefinitionsLayout } from './02-GeneralDefinition/layout'

// إعادة تصدير التكوين
export { hospitalConfig } from './01-hospital/config'
export { generalDefinitionsConfig } from './02-GeneralDefinition/config'

// إعادة تصدير الأنواع
export type { HospitalConfig } from './01-hospital/config'
export type { GeneralDefinitionsConfig } from './02-GeneralDefinition/config'

// إعادة تصدير الثوابت
export {
  HOSPITAL_SUB_MODULE_IDS,
  HOSPITAL_SUB_MODULE_PATHS,
  HOSPITAL_MODULE_COLORS,
  HOSPITAL_MODULE_ICONS
} from './01-hospital/constants'

export {
  SUB_MODULE_IDS,
  SUB_MODULE_PATHS,
  MODULE_COLORS,
  MODULE_ICONS,
  REQUIRED_PERMISSIONS,
  DEFAULT_SETTINGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  MODULE_TYPES,
  MODULE_STATES,
  LAYOUT_CONFIG,
  GRID_CONFIG
} from './02-GeneralDefinition/constants'

// إعادة تصدير الأدوات المساعدة
export {
  getHospitalModuleTitle,
  getHospitalModuleDescription,
  getHospitalModulePath,
  getHospitalModuleColor,
  getHospitalModuleIcon,
  isValidHospitalModuleId,
  getHospitalModuleInfo,
  getAllHospitalModules
} from './01-hospital/utils'

export {
  getModuleTitle,
  getModuleDescription,
  getModulePath,
  getModuleColor,
  getModuleIcon,
  isValidModuleId,
  getModuleInfo,
  getAllModules
} from './02-GeneralDefinition/utils'

// إعادة تصدير الـ Hooks
export {
  useHospitalModule,
  useHospitalSubModules,
  useHospitalSettings
} from './01-hospital/hooks'

export {
  useGeneralDefinitionsModule,
  useSubModules,
  useModuleSettings
} from './02-GeneralDefinition/hooks'

// إعادة تصدير الأنواع
export type {
  HospitalSubModule,
  HospitalSettings,
  HospitalData,
  HospitalState,
  HospitalActions,
  HospitalComponentProps,
  HospitalPageProps,
  HospitalLayoutProps,
  HospitalError,
  HospitalStats,
  HospitalConfig
} from './01-hospital/types'

export type {
  SubModule,
  ModuleSettings,
  ModuleData,
  ModuleState,
  ModuleActions,
  ModuleComponentProps,
  ModulePageProps,
  ModuleLayoutProps,
  ModuleError,
  ModuleStats,
  ModuleConfig
} from './02-GeneralDefinition/types'