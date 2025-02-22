import os from 'os'

export abstract class PathUtils {
  public static normalize(fullPath: string): string {
    if (os.platform() === 'win32') {
      // On windows remove the drive letter but keep the leading slash
      const relativePath = fullPath.replace(/^[A-Z]:/, '')
      return relativePath.replace(/\\/g, '/')
    }
    return fullPath // Unix paths remain unchanged
  }
}
