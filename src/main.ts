import * as core from '@actions/core'

interface ServiceVersion {
  major: number
  minor: number
  patch: number
}

function hasBeenBumped(
  baseVersion: ServiceVersion,
  headVersion: ServiceVersion
): boolean {
  return (
    headVersion.major > baseVersion.major ||
    headVersion.minor > baseVersion.minor ||
    headVersion.patch > baseVersion.patch
  )
}
function run(): void {
  try {
    const headVersionString: string = core.getInput('headVer')
    const baseVersionString: string = core.getInput('baseVer')

    const headVersionData: string[] = headVersionString.split('.')
    const baseVersionData: string[] = baseVersionString.split('.')

    const headVersion: ServiceVersion = {
      major: Number(headVersionData[0]),
      minor: Number(headVersionData[1]),
      patch: Number(headVersionData[2])
    }

    const baseVersion: ServiceVersion = {
      major: Number(baseVersionData[0]),
      minor: Number(baseVersionData[1]),
      patch: Number(baseVersionData[2])
    }

    const bumped = hasBeenBumped(baseVersion, headVersion)

    core.setOutput('bumped', bumped)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
