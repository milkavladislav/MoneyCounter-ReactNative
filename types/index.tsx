export interface IAccount {
    id?: number,
    name: string, 
    amount: number //for statistic
}

export interface ICategory {
    id?: number,
    name: string,
    icon: string, 
    type: TransactionType,
    amount: number //for statistic
}

export interface ITransaction {
    id?: number,
    amount: number, // if type Expenses - negative
    idCategory: number,
    idAccount: number,
    date: Date,
    comment: string,
    photos: string[]
}

export enum TransactionType {
    Expenses = "expenses",
    Income = "income",
}

export const AvailableIcons: {iconName: string}[] = [
    {iconName: "account"},
    {iconName: "airplane"},
    {iconName: "alarm"},
    {iconName: "account-supervisor"},
    {iconName: "android"},
    {iconName: "apple"},
    {iconName: "basket"},
    {iconName: "bank"},
    {iconName: "basketball"},
    {iconName: "bike"},
    {iconName: "bread-slice"},
    {iconName: "briefcase"},
    {iconName: "bus"},
    {iconName: "cards"},
]
