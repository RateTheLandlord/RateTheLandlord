/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	//added i18n.ts to setupFiles to fix warnings, relevant SO issue: https://stackoverflow.com/questions/68770813/react-i18next-you-will-need-to-pass-in-an-i18next-instance-by-using-initreacti
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts', '<rootDir>/i18n.ts'],
	// globals tsConfig deprecated, relevant SO issue: https://stackoverflow.com/questions/68656057/why-isnt-ts-jest-loading-my-custom-tsconfig-file
	transform: {
		// '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
		// '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.jest.json',
			},
		],
	},
	moduleNameMapper: {
		// "@/*": ["./*"]
		'^@/(.*)$': ['<rootDir>/$1'],
	},
}
