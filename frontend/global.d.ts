// Declaring this interface provides type safety for message keys
type Messages = typeof import('./localization/en-CA.json')
declare interface IntlMessages extends Messages {}
