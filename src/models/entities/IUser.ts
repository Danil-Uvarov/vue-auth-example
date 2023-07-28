export interface IUser {
  name: string
  login: string
  role: {
    id: string
    dscr: string
  }
  company: {
    id: string
    descr: string
  }
  avatarFileId: number
}
