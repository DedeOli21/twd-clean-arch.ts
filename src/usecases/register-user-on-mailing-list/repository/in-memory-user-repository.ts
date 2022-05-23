import { UserRepository } from '../ports/user-repository'
import { UserData } from '../user-data'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[] = []

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    this.repository.push(user)
  }

  async findUserByEmail(email: string): Promise<UserData> {
    return null
    // return this.repository.find(user => user.email === email)
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<boolean> {
    return this.repository.some(u => u.email === user.email)
  }
}
