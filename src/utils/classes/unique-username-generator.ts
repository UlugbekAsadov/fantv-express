export class UniqueUsernameGenerator {
  private generatedUsernames: Set<string>;

  constructor() {
    this.generatedUsernames = new Set<string>();
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public generateUsername(length: number = 8): string {
    let username: string;
    do {
      username = this.generateRandomString(length);
    } while (this.generatedUsernames.has(username));
    this.generatedUsernames.add(username);
    return username;
  }
}
