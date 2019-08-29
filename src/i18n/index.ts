import * as Localization from "expo-localization"
import i18n from "i18n-js"
import { en, fr } from "./locales"

i18n.translations = { fr, en }
i18n.fallbacks = true
i18n.locale = Localization.locale
export default i18n
