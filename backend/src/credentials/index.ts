import {config} from "../index";

// Core interfaces
import {
    createAgent,
    ICredentialPlugin,
    IDataStore,
    IDataStoreORM,
    IDIDManager,
    IKeyManager,
    IResolver,
} from '@veramo/core'

// Core identity manager plugin
import {DIDManager} from '@veramo/did-manager'

// Ethr did identity provider
import {EthrDIDProvider} from '@veramo/did-provider-ethr'

// Core key manager plugin
import {KeyManager} from '@veramo/key-manager'

// Custom key management system for RN
import {KeyManagementSystem, SecretBox} from '@veramo/kms-local'

// W3C Verifiable Credential plugin
import {CredentialPlugin} from '@veramo/credential-w3c'

// Custom resolvers
import {DIDResolverPlugin} from '@veramo/did-resolver'
import {Resolver} from 'did-resolver'
import {getResolver as ethrDidResolver} from 'ethr-did-resolver'
import {getResolver as webDidResolver} from 'web-did-resolver'

// Storage plugin using TypeOrm
import {DIDStore, Entities, KeyStore, migrations, PrivateKeyStore} from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import {DataSource,LoggerOptions} from 'typeorm'


// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '<your PROJECT_ID here>'

// This will be the secret key for the KMS
const KMS_SECRET_KEY =
    '< you can generate a key by running `npx @veramo/cli config create-secret-key` in a terminal>'

let dbConnection: Promise<DataSource>
const logLevels:  LoggerOptions | undefined = config.logLevel.toLowerCase() === 'debug'
    ? ['query', 'error', 'info', 'warn']
    : ['error', 'info', 'warn']

// Using SQLite is not recommended. See readme for a one-liner to start a postgres instance w/ Docker
if (config.databaseType.toLowerCase() === "sqlite") {
    dbConnection = new DataSource({
        type: 'sqlite',
        database: 'database.sqlite',
        synchronize: false,
        migrations,
        migrationsRun: true,
        logging: logLevels,
        entities: Entities,
    }).initialize()
} else {
    dbConnection = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: logLevels,
        entities: Entities,
    }).initialize()
}


export const agent = createAgent<
    IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin
>({
    plugins: [
        new KeyManager({
            store: new KeyStore(dbConnection),
            kms: {
                local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
            },
        }),
        new DIDManager({
            store: new DIDStore(dbConnection),
            defaultProvider: 'did:ethr:goerli',
            providers: {
                'did:ethr:goerli': new EthrDIDProvider({
                    defaultKms: 'local',
                    network: 'goerli',
                    rpcUrl: config.rpcUrl,
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver({
                ...ethrDidResolver({infuraProjectId: INFURA_PROJECT_ID}),
                ...webDidResolver(),
            }),
        }),
        new CredentialPlugin(),
    ],
})