import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AffectedRowsOutput = {
  __typename?: 'AffectedRowsOutput';
  count: Scalars['Int']['output'];
};

export type AggregateAttestation = {
  __typename?: 'AggregateAttestation';
  _avg?: Maybe<AttestationAvgAggregate>;
  _count?: Maybe<AttestationCountAggregate>;
  _max?: Maybe<AttestationMaxAggregate>;
  _min?: Maybe<AttestationMinAggregate>;
  _sum?: Maybe<AttestationSumAggregate>;
};

export type AggregateEnsName = {
  __typename?: 'AggregateEnsName';
  _avg?: Maybe<EnsNameAvgAggregate>;
  _count?: Maybe<EnsNameCountAggregate>;
  _max?: Maybe<EnsNameMaxAggregate>;
  _min?: Maybe<EnsNameMinAggregate>;
  _sum?: Maybe<EnsNameSumAggregate>;
};

export type AggregateOffchainRevocation = {
  __typename?: 'AggregateOffchainRevocation';
  _avg?: Maybe<OffchainRevocationAvgAggregate>;
  _count?: Maybe<OffchainRevocationCountAggregate>;
  _max?: Maybe<OffchainRevocationMaxAggregate>;
  _min?: Maybe<OffchainRevocationMinAggregate>;
  _sum?: Maybe<OffchainRevocationSumAggregate>;
};

export type AggregateSchema = {
  __typename?: 'AggregateSchema';
  _avg?: Maybe<SchemaAvgAggregate>;
  _count?: Maybe<SchemaCountAggregate>;
  _max?: Maybe<SchemaMaxAggregate>;
  _min?: Maybe<SchemaMinAggregate>;
  _sum?: Maybe<SchemaSumAggregate>;
};

export type AggregateSchemaName = {
  __typename?: 'AggregateSchemaName';
  _avg?: Maybe<SchemaNameAvgAggregate>;
  _count?: Maybe<SchemaNameCountAggregate>;
  _max?: Maybe<SchemaNameMaxAggregate>;
  _min?: Maybe<SchemaNameMinAggregate>;
  _sum?: Maybe<SchemaNameSumAggregate>;
};

export type AggregateServiceStat = {
  __typename?: 'AggregateServiceStat';
  _count?: Maybe<ServiceStatCountAggregate>;
  _max?: Maybe<ServiceStatMaxAggregate>;
  _min?: Maybe<ServiceStatMinAggregate>;
};

export type AggregateTimestamp = {
  __typename?: 'AggregateTimestamp';
  _avg?: Maybe<TimestampAvgAggregate>;
  _count?: Maybe<TimestampCountAggregate>;
  _max?: Maybe<TimestampMaxAggregate>;
  _min?: Maybe<TimestampMinAggregate>;
  _sum?: Maybe<TimestampSumAggregate>;
};

export type Attestation = {
  __typename?: 'Attestation';
  attester: Scalars['String']['output'];
  data: Scalars['String']['output'];
  decodedDataJson: Scalars['String']['output'];
  expirationTime: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ipfsHash: Scalars['String']['output'];
  isOffchain: Scalars['Boolean']['output'];
  recipient: Scalars['String']['output'];
  refUID: Scalars['String']['output'];
  revocable: Scalars['Boolean']['output'];
  revocationTime: Scalars['Int']['output'];
  revoked: Scalars['Boolean']['output'];
  schema: Schema;
  schemaId: Scalars['String']['output'];
  time: Scalars['Int']['output'];
  timeCreated: Scalars['Int']['output'];
  txid: Scalars['String']['output'];
};

export type AttestationAvgAggregate = {
  __typename?: 'AttestationAvgAggregate';
  expirationTime?: Maybe<Scalars['Float']['output']>;
  revocationTime?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  timeCreated?: Maybe<Scalars['Float']['output']>;
};

export type AttestationAvgOrderByAggregateInput = {
  expirationTime?: InputMaybe<SortOrder>;
  revocationTime?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  timeCreated?: InputMaybe<SortOrder>;
};

export type AttestationCountAggregate = {
  __typename?: 'AttestationCountAggregate';
  _all: Scalars['Int']['output'];
  attester: Scalars['Int']['output'];
  data: Scalars['Int']['output'];
  decodedDataJson: Scalars['Int']['output'];
  expirationTime: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  ipfsHash: Scalars['Int']['output'];
  isOffchain: Scalars['Int']['output'];
  recipient: Scalars['Int']['output'];
  refUID: Scalars['Int']['output'];
  revocable: Scalars['Int']['output'];
  revocationTime: Scalars['Int']['output'];
  revoked: Scalars['Int']['output'];
  schemaId: Scalars['Int']['output'];
  time: Scalars['Int']['output'];
  timeCreated: Scalars['Int']['output'];
  txid: Scalars['Int']['output'];
};

export type AttestationCountOrderByAggregateInput = {
  attester?: InputMaybe<SortOrder>;
  data?: InputMaybe<SortOrder>;
  decodedDataJson?: InputMaybe<SortOrder>;
  expirationTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ipfsHash?: InputMaybe<SortOrder>;
  isOffchain?: InputMaybe<SortOrder>;
  recipient?: InputMaybe<SortOrder>;
  refUID?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  revocationTime?: InputMaybe<SortOrder>;
  revoked?: InputMaybe<SortOrder>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  timeCreated?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type AttestationCreateInput = {
  attester: Scalars['String']['input'];
  data: Scalars['String']['input'];
  decodedDataJson?: InputMaybe<Scalars['String']['input']>;
  expirationTime: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  ipfsHash: Scalars['String']['input'];
  isOffchain: Scalars['Boolean']['input'];
  recipient: Scalars['String']['input'];
  refUID: Scalars['String']['input'];
  revocable: Scalars['Boolean']['input'];
  revocationTime: Scalars['Int']['input'];
  revoked: Scalars['Boolean']['input'];
  schema: SchemaCreateNestedOneWithoutAttestationsInput;
  time: Scalars['Int']['input'];
  timeCreated: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
};

export type AttestationCreateManyInput = {
  attester: Scalars['String']['input'];
  data: Scalars['String']['input'];
  decodedDataJson?: InputMaybe<Scalars['String']['input']>;
  expirationTime: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  ipfsHash: Scalars['String']['input'];
  isOffchain: Scalars['Boolean']['input'];
  recipient: Scalars['String']['input'];
  refUID: Scalars['String']['input'];
  revocable: Scalars['Boolean']['input'];
  revocationTime: Scalars['Int']['input'];
  revoked: Scalars['Boolean']['input'];
  schemaId: Scalars['String']['input'];
  time: Scalars['Int']['input'];
  timeCreated: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
};

export type AttestationCreateManySchemaInput = {
  attester: Scalars['String']['input'];
  data: Scalars['String']['input'];
  decodedDataJson?: InputMaybe<Scalars['String']['input']>;
  expirationTime: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  ipfsHash: Scalars['String']['input'];
  isOffchain: Scalars['Boolean']['input'];
  recipient: Scalars['String']['input'];
  refUID: Scalars['String']['input'];
  revocable: Scalars['Boolean']['input'];
  revocationTime: Scalars['Int']['input'];
  revoked: Scalars['Boolean']['input'];
  time: Scalars['Int']['input'];
  timeCreated: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
};

export type AttestationCreateManySchemaInputEnvelope = {
  data: Array<AttestationCreateManySchemaInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AttestationCreateNestedManyWithoutSchemaInput = {
  connect?: InputMaybe<Array<AttestationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AttestationCreateOrConnectWithoutSchemaInput>>;
  create?: InputMaybe<Array<AttestationCreateWithoutSchemaInput>>;
  createMany?: InputMaybe<AttestationCreateManySchemaInputEnvelope>;
};

export type AttestationCreateOrConnectWithoutSchemaInput = {
  create: AttestationCreateWithoutSchemaInput;
  where: AttestationWhereUniqueInput;
};

export type AttestationCreateWithoutSchemaInput = {
  attester: Scalars['String']['input'];
  data: Scalars['String']['input'];
  decodedDataJson?: InputMaybe<Scalars['String']['input']>;
  expirationTime: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  ipfsHash: Scalars['String']['input'];
  isOffchain: Scalars['Boolean']['input'];
  recipient: Scalars['String']['input'];
  refUID: Scalars['String']['input'];
  revocable: Scalars['Boolean']['input'];
  revocationTime: Scalars['Int']['input'];
  revoked: Scalars['Boolean']['input'];
  time: Scalars['Int']['input'];
  timeCreated: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
};

export type AttestationGroupBy = {
  __typename?: 'AttestationGroupBy';
  _avg?: Maybe<AttestationAvgAggregate>;
  _count?: Maybe<AttestationCountAggregate>;
  _max?: Maybe<AttestationMaxAggregate>;
  _min?: Maybe<AttestationMinAggregate>;
  _sum?: Maybe<AttestationSumAggregate>;
  attester: Scalars['String']['output'];
  data: Scalars['String']['output'];
  decodedDataJson: Scalars['String']['output'];
  expirationTime: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ipfsHash: Scalars['String']['output'];
  isOffchain: Scalars['Boolean']['output'];
  recipient: Scalars['String']['output'];
  refUID: Scalars['String']['output'];
  revocable: Scalars['Boolean']['output'];
  revocationTime: Scalars['Int']['output'];
  revoked: Scalars['Boolean']['output'];
  schemaId: Scalars['String']['output'];
  time: Scalars['Int']['output'];
  timeCreated: Scalars['Int']['output'];
  txid: Scalars['String']['output'];
};

export type AttestationListRelationFilter = {
  every?: InputMaybe<AttestationWhereInput>;
  none?: InputMaybe<AttestationWhereInput>;
  some?: InputMaybe<AttestationWhereInput>;
};

export type AttestationMaxAggregate = {
  __typename?: 'AttestationMaxAggregate';
  attester?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  decodedDataJson?: Maybe<Scalars['String']['output']>;
  expirationTime?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipfsHash?: Maybe<Scalars['String']['output']>;
  isOffchain?: Maybe<Scalars['Boolean']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  refUID?: Maybe<Scalars['String']['output']>;
  revocable?: Maybe<Scalars['Boolean']['output']>;
  revocationTime?: Maybe<Scalars['Int']['output']>;
  revoked?: Maybe<Scalars['Boolean']['output']>;
  schemaId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  timeCreated?: Maybe<Scalars['Int']['output']>;
  txid?: Maybe<Scalars['String']['output']>;
};

export type AttestationMaxOrderByAggregateInput = {
  attester?: InputMaybe<SortOrder>;
  data?: InputMaybe<SortOrder>;
  decodedDataJson?: InputMaybe<SortOrder>;
  expirationTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ipfsHash?: InputMaybe<SortOrder>;
  isOffchain?: InputMaybe<SortOrder>;
  recipient?: InputMaybe<SortOrder>;
  refUID?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  revocationTime?: InputMaybe<SortOrder>;
  revoked?: InputMaybe<SortOrder>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  timeCreated?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type AttestationMinAggregate = {
  __typename?: 'AttestationMinAggregate';
  attester?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  decodedDataJson?: Maybe<Scalars['String']['output']>;
  expirationTime?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipfsHash?: Maybe<Scalars['String']['output']>;
  isOffchain?: Maybe<Scalars['Boolean']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
  refUID?: Maybe<Scalars['String']['output']>;
  revocable?: Maybe<Scalars['Boolean']['output']>;
  revocationTime?: Maybe<Scalars['Int']['output']>;
  revoked?: Maybe<Scalars['Boolean']['output']>;
  schemaId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  timeCreated?: Maybe<Scalars['Int']['output']>;
  txid?: Maybe<Scalars['String']['output']>;
};

export type AttestationMinOrderByAggregateInput = {
  attester?: InputMaybe<SortOrder>;
  data?: InputMaybe<SortOrder>;
  decodedDataJson?: InputMaybe<SortOrder>;
  expirationTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ipfsHash?: InputMaybe<SortOrder>;
  isOffchain?: InputMaybe<SortOrder>;
  recipient?: InputMaybe<SortOrder>;
  refUID?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  revocationTime?: InputMaybe<SortOrder>;
  revoked?: InputMaybe<SortOrder>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  timeCreated?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type AttestationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AttestationOrderByWithAggregationInput = {
  _avg?: InputMaybe<AttestationAvgOrderByAggregateInput>;
  _count?: InputMaybe<AttestationCountOrderByAggregateInput>;
  _max?: InputMaybe<AttestationMaxOrderByAggregateInput>;
  _min?: InputMaybe<AttestationMinOrderByAggregateInput>;
  _sum?: InputMaybe<AttestationSumOrderByAggregateInput>;
  attester?: InputMaybe<SortOrder>;
  data?: InputMaybe<SortOrder>;
  decodedDataJson?: InputMaybe<SortOrder>;
  expirationTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ipfsHash?: InputMaybe<SortOrder>;
  isOffchain?: InputMaybe<SortOrder>;
  recipient?: InputMaybe<SortOrder>;
  refUID?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  revocationTime?: InputMaybe<SortOrder>;
  revoked?: InputMaybe<SortOrder>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  timeCreated?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type AttestationOrderByWithRelationInput = {
  attester?: InputMaybe<SortOrder>;
  data?: InputMaybe<SortOrder>;
  decodedDataJson?: InputMaybe<SortOrder>;
  expirationTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ipfsHash?: InputMaybe<SortOrder>;
  isOffchain?: InputMaybe<SortOrder>;
  recipient?: InputMaybe<SortOrder>;
  refUID?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  revocationTime?: InputMaybe<SortOrder>;
  revoked?: InputMaybe<SortOrder>;
  schema?: InputMaybe<SchemaOrderByWithRelationInput>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  timeCreated?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export enum AttestationScalarFieldEnum {
  Attester = 'attester',
  Data = 'data',
  DecodedDataJson = 'decodedDataJson',
  ExpirationTime = 'expirationTime',
  Id = 'id',
  IpfsHash = 'ipfsHash',
  IsOffchain = 'isOffchain',
  Recipient = 'recipient',
  RefUid = 'refUID',
  Revocable = 'revocable',
  RevocationTime = 'revocationTime',
  Revoked = 'revoked',
  SchemaId = 'schemaId',
  Time = 'time',
  TimeCreated = 'timeCreated',
  Txid = 'txid'
}

export type AttestationScalarWhereInput = {
  AND?: InputMaybe<Array<AttestationScalarWhereInput>>;
  NOT?: InputMaybe<Array<AttestationScalarWhereInput>>;
  OR?: InputMaybe<Array<AttestationScalarWhereInput>>;
  attester?: InputMaybe<StringFilter>;
  data?: InputMaybe<StringFilter>;
  decodedDataJson?: InputMaybe<StringFilter>;
  expirationTime?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  ipfsHash?: InputMaybe<StringFilter>;
  isOffchain?: InputMaybe<BoolFilter>;
  recipient?: InputMaybe<StringFilter>;
  refUID?: InputMaybe<StringFilter>;
  revocable?: InputMaybe<BoolFilter>;
  revocationTime?: InputMaybe<IntFilter>;
  revoked?: InputMaybe<BoolFilter>;
  schemaId?: InputMaybe<StringFilter>;
  time?: InputMaybe<IntFilter>;
  timeCreated?: InputMaybe<IntFilter>;
  txid?: InputMaybe<StringFilter>;
};

export type AttestationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AttestationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<AttestationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AttestationScalarWhereWithAggregatesInput>>;
  attester?: InputMaybe<StringWithAggregatesFilter>;
  data?: InputMaybe<StringWithAggregatesFilter>;
  decodedDataJson?: InputMaybe<StringWithAggregatesFilter>;
  expirationTime?: InputMaybe<IntWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  ipfsHash?: InputMaybe<StringWithAggregatesFilter>;
  isOffchain?: InputMaybe<BoolWithAggregatesFilter>;
  recipient?: InputMaybe<StringWithAggregatesFilter>;
  refUID?: InputMaybe<StringWithAggregatesFilter>;
  revocable?: InputMaybe<BoolWithAggregatesFilter>;
  revocationTime?: InputMaybe<IntWithAggregatesFilter>;
  revoked?: InputMaybe<BoolWithAggregatesFilter>;
  schemaId?: InputMaybe<StringWithAggregatesFilter>;
  time?: InputMaybe<IntWithAggregatesFilter>;
  timeCreated?: InputMaybe<IntWithAggregatesFilter>;
  txid?: InputMaybe<StringWithAggregatesFilter>;
};

export type AttestationSumAggregate = {
  __typename?: 'AttestationSumAggregate';
  expirationTime?: Maybe<Scalars['Int']['output']>;
  revocationTime?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  timeCreated?: Maybe<Scalars['Int']['output']>;
};

export type AttestationSumOrderByAggregateInput = {
  expirationTime?: InputMaybe<SortOrder>;
  revocationTime?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  timeCreated?: InputMaybe<SortOrder>;
};

export type AttestationUpdateInput = {
  attester?: InputMaybe<StringFieldUpdateOperationsInput>;
  data?: InputMaybe<StringFieldUpdateOperationsInput>;
  decodedDataJson?: InputMaybe<StringFieldUpdateOperationsInput>;
  expirationTime?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  ipfsHash?: InputMaybe<StringFieldUpdateOperationsInput>;
  isOffchain?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  refUID?: InputMaybe<StringFieldUpdateOperationsInput>;
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>;
  revocationTime?: InputMaybe<IntFieldUpdateOperationsInput>;
  revoked?: InputMaybe<BoolFieldUpdateOperationsInput>;
  schema?: InputMaybe<SchemaUpdateOneRequiredWithoutAttestationsNestedInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
  timeCreated?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AttestationUpdateManyMutationInput = {
  attester?: InputMaybe<StringFieldUpdateOperationsInput>;
  data?: InputMaybe<StringFieldUpdateOperationsInput>;
  decodedDataJson?: InputMaybe<StringFieldUpdateOperationsInput>;
  expirationTime?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  ipfsHash?: InputMaybe<StringFieldUpdateOperationsInput>;
  isOffchain?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  refUID?: InputMaybe<StringFieldUpdateOperationsInput>;
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>;
  revocationTime?: InputMaybe<IntFieldUpdateOperationsInput>;
  revoked?: InputMaybe<BoolFieldUpdateOperationsInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
  timeCreated?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AttestationUpdateManyWithWhereWithoutSchemaInput = {
  data: AttestationUpdateManyMutationInput;
  where: AttestationScalarWhereInput;
};

export type AttestationUpdateManyWithoutSchemaNestedInput = {
  connect?: InputMaybe<Array<AttestationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AttestationCreateOrConnectWithoutSchemaInput>>;
  create?: InputMaybe<Array<AttestationCreateWithoutSchemaInput>>;
  createMany?: InputMaybe<AttestationCreateManySchemaInputEnvelope>;
  delete?: InputMaybe<Array<AttestationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AttestationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AttestationWhereUniqueInput>>;
  set?: InputMaybe<Array<AttestationWhereUniqueInput>>;
  update?: InputMaybe<Array<AttestationUpdateWithWhereUniqueWithoutSchemaInput>>;
  updateMany?: InputMaybe<Array<AttestationUpdateManyWithWhereWithoutSchemaInput>>;
  upsert?: InputMaybe<Array<AttestationUpsertWithWhereUniqueWithoutSchemaInput>>;
};

export type AttestationUpdateWithWhereUniqueWithoutSchemaInput = {
  data: AttestationUpdateWithoutSchemaInput;
  where: AttestationWhereUniqueInput;
};

export type AttestationUpdateWithoutSchemaInput = {
  attester?: InputMaybe<StringFieldUpdateOperationsInput>;
  data?: InputMaybe<StringFieldUpdateOperationsInput>;
  decodedDataJson?: InputMaybe<StringFieldUpdateOperationsInput>;
  expirationTime?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  ipfsHash?: InputMaybe<StringFieldUpdateOperationsInput>;
  isOffchain?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  refUID?: InputMaybe<StringFieldUpdateOperationsInput>;
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>;
  revocationTime?: InputMaybe<IntFieldUpdateOperationsInput>;
  revoked?: InputMaybe<BoolFieldUpdateOperationsInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
  timeCreated?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type AttestationUpsertWithWhereUniqueWithoutSchemaInput = {
  create: AttestationCreateWithoutSchemaInput;
  update: AttestationUpdateWithoutSchemaInput;
  where: AttestationWhereUniqueInput;
};

export type AttestationWhereInput = {
  AND?: InputMaybe<Array<AttestationWhereInput>>;
  NOT?: InputMaybe<Array<AttestationWhereInput>>;
  OR?: InputMaybe<Array<AttestationWhereInput>>;
  attester?: InputMaybe<StringFilter>;
  data?: InputMaybe<StringFilter>;
  decodedDataJson?: InputMaybe<StringFilter>;
  expirationTime?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  ipfsHash?: InputMaybe<StringFilter>;
  isOffchain?: InputMaybe<BoolFilter>;
  recipient?: InputMaybe<StringFilter>;
  refUID?: InputMaybe<StringFilter>;
  revocable?: InputMaybe<BoolFilter>;
  revocationTime?: InputMaybe<IntFilter>;
  revoked?: InputMaybe<BoolFilter>;
  schema?: InputMaybe<SchemaRelationFilter>;
  schemaId?: InputMaybe<StringFilter>;
  time?: InputMaybe<IntFilter>;
  timeCreated?: InputMaybe<IntFilter>;
  txid?: InputMaybe<StringFilter>;
};

export type AttestationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type EnsName = {
  __typename?: 'EnsName';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type EnsNameAvgAggregate = {
  __typename?: 'EnsNameAvgAggregate';
  timestamp?: Maybe<Scalars['Float']['output']>;
};

export type EnsNameAvgOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>;
};

export type EnsNameCountAggregate = {
  __typename?: 'EnsNameCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  timestamp: Scalars['Int']['output'];
};

export type EnsNameCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
};

export type EnsNameCreateInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timestamp: Scalars['Int']['input'];
};

export type EnsNameCreateManyInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timestamp: Scalars['Int']['input'];
};

export type EnsNameGroupBy = {
  __typename?: 'EnsNameGroupBy';
  _avg?: Maybe<EnsNameAvgAggregate>;
  _count?: Maybe<EnsNameCountAggregate>;
  _max?: Maybe<EnsNameMaxAggregate>;
  _min?: Maybe<EnsNameMinAggregate>;
  _sum?: Maybe<EnsNameSumAggregate>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type EnsNameMaxAggregate = {
  __typename?: 'EnsNameMaxAggregate';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
};

export type EnsNameMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
};

export type EnsNameMinAggregate = {
  __typename?: 'EnsNameMinAggregate';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
};

export type EnsNameMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
};

export type EnsNameOrderByWithAggregationInput = {
  _avg?: InputMaybe<EnsNameAvgOrderByAggregateInput>;
  _count?: InputMaybe<EnsNameCountOrderByAggregateInput>;
  _max?: InputMaybe<EnsNameMaxOrderByAggregateInput>;
  _min?: InputMaybe<EnsNameMinOrderByAggregateInput>;
  _sum?: InputMaybe<EnsNameSumOrderByAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
};

export type EnsNameOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
};

export enum EnsNameScalarFieldEnum {
  Id = 'id',
  Name = 'name',
  Timestamp = 'timestamp'
}

export type EnsNameScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<EnsNameScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<EnsNameScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<EnsNameScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  timestamp?: InputMaybe<IntWithAggregatesFilter>;
};

export type EnsNameSumAggregate = {
  __typename?: 'EnsNameSumAggregate';
  timestamp?: Maybe<Scalars['Int']['output']>;
};

export type EnsNameSumOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>;
};

export type EnsNameUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type EnsNameUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type EnsNameWhereInput = {
  AND?: InputMaybe<Array<EnsNameWhereInput>>;
  NOT?: InputMaybe<Array<EnsNameWhereInput>>;
  OR?: InputMaybe<Array<EnsNameWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<IntFilter>;
};

export type EnsNameWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyAttestation: AffectedRowsOutput;
  createManyEnsName: AffectedRowsOutput;
  createManyOffchainRevocation: AffectedRowsOutput;
  createManySchema: AffectedRowsOutput;
  createManySchemaName: AffectedRowsOutput;
  createManyServiceStat: AffectedRowsOutput;
  createManyTimestamp: AffectedRowsOutput;
  createOneAttestation: Attestation;
  createOneEnsName: EnsName;
  createOneOffchainRevocation: OffchainRevocation;
  createOneSchema: Schema;
  createOneSchemaName: SchemaName;
  createOneServiceStat: ServiceStat;
  createOneTimestamp: Timestamp;
  deleteManyAttestation: AffectedRowsOutput;
  deleteManyEnsName: AffectedRowsOutput;
  deleteManyOffchainRevocation: AffectedRowsOutput;
  deleteManySchema: AffectedRowsOutput;
  deleteManySchemaName: AffectedRowsOutput;
  deleteManyServiceStat: AffectedRowsOutput;
  deleteManyTimestamp: AffectedRowsOutput;
  deleteOneAttestation?: Maybe<Attestation>;
  deleteOneEnsName?: Maybe<EnsName>;
  deleteOneOffchainRevocation?: Maybe<OffchainRevocation>;
  deleteOneSchema?: Maybe<Schema>;
  deleteOneSchemaName?: Maybe<SchemaName>;
  deleteOneServiceStat?: Maybe<ServiceStat>;
  deleteOneTimestamp?: Maybe<Timestamp>;
  updateManyAttestation: AffectedRowsOutput;
  updateManyEnsName: AffectedRowsOutput;
  updateManyOffchainRevocation: AffectedRowsOutput;
  updateManySchema: AffectedRowsOutput;
  updateManySchemaName: AffectedRowsOutput;
  updateManyServiceStat: AffectedRowsOutput;
  updateManyTimestamp: AffectedRowsOutput;
  updateOneAttestation?: Maybe<Attestation>;
  updateOneEnsName?: Maybe<EnsName>;
  updateOneOffchainRevocation?: Maybe<OffchainRevocation>;
  updateOneSchema?: Maybe<Schema>;
  updateOneSchemaName?: Maybe<SchemaName>;
  updateOneServiceStat?: Maybe<ServiceStat>;
  updateOneTimestamp?: Maybe<Timestamp>;
  upsertOneAttestation: Attestation;
  upsertOneEnsName: EnsName;
  upsertOneOffchainRevocation: OffchainRevocation;
  upsertOneSchema: Schema;
  upsertOneSchemaName: SchemaName;
  upsertOneServiceStat: ServiceStat;
  upsertOneTimestamp: Timestamp;
};


export type MutationCreateManyAttestationArgs = {
  data: Array<AttestationCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyEnsNameArgs = {
  data: Array<EnsNameCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyOffchainRevocationArgs = {
  data: Array<OffchainRevocationCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManySchemaArgs = {
  data: Array<SchemaCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManySchemaNameArgs = {
  data: Array<SchemaNameCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyServiceStatArgs = {
  data: Array<ServiceStatCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateManyTimestampArgs = {
  data: Array<TimestampCreateManyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateOneAttestationArgs = {
  data: AttestationCreateInput;
};


export type MutationCreateOneEnsNameArgs = {
  data: EnsNameCreateInput;
};


export type MutationCreateOneOffchainRevocationArgs = {
  data: OffchainRevocationCreateInput;
};


export type MutationCreateOneSchemaArgs = {
  data: SchemaCreateInput;
};


export type MutationCreateOneSchemaNameArgs = {
  data: SchemaNameCreateInput;
};


export type MutationCreateOneServiceStatArgs = {
  data: ServiceStatCreateInput;
};


export type MutationCreateOneTimestampArgs = {
  data: TimestampCreateInput;
};


export type MutationDeleteManyAttestationArgs = {
  where?: InputMaybe<AttestationWhereInput>;
};


export type MutationDeleteManyEnsNameArgs = {
  where?: InputMaybe<EnsNameWhereInput>;
};


export type MutationDeleteManyOffchainRevocationArgs = {
  where?: InputMaybe<OffchainRevocationWhereInput>;
};


export type MutationDeleteManySchemaArgs = {
  where?: InputMaybe<SchemaWhereInput>;
};


export type MutationDeleteManySchemaNameArgs = {
  where?: InputMaybe<SchemaNameWhereInput>;
};


export type MutationDeleteManyServiceStatArgs = {
  where?: InputMaybe<ServiceStatWhereInput>;
};


export type MutationDeleteManyTimestampArgs = {
  where?: InputMaybe<TimestampWhereInput>;
};


export type MutationDeleteOneAttestationArgs = {
  where: AttestationWhereUniqueInput;
};


export type MutationDeleteOneEnsNameArgs = {
  where: EnsNameWhereUniqueInput;
};


export type MutationDeleteOneOffchainRevocationArgs = {
  where: OffchainRevocationWhereUniqueInput;
};


export type MutationDeleteOneSchemaArgs = {
  where: SchemaWhereUniqueInput;
};


export type MutationDeleteOneSchemaNameArgs = {
  where: SchemaNameWhereUniqueInput;
};


export type MutationDeleteOneServiceStatArgs = {
  where: ServiceStatWhereUniqueInput;
};


export type MutationDeleteOneTimestampArgs = {
  where: TimestampWhereUniqueInput;
};


export type MutationUpdateManyAttestationArgs = {
  data: AttestationUpdateManyMutationInput;
  where?: InputMaybe<AttestationWhereInput>;
};


export type MutationUpdateManyEnsNameArgs = {
  data: EnsNameUpdateManyMutationInput;
  where?: InputMaybe<EnsNameWhereInput>;
};


export type MutationUpdateManyOffchainRevocationArgs = {
  data: OffchainRevocationUpdateManyMutationInput;
  where?: InputMaybe<OffchainRevocationWhereInput>;
};


export type MutationUpdateManySchemaArgs = {
  data: SchemaUpdateManyMutationInput;
  where?: InputMaybe<SchemaWhereInput>;
};


export type MutationUpdateManySchemaNameArgs = {
  data: SchemaNameUpdateManyMutationInput;
  where?: InputMaybe<SchemaNameWhereInput>;
};


export type MutationUpdateManyServiceStatArgs = {
  data: ServiceStatUpdateManyMutationInput;
  where?: InputMaybe<ServiceStatWhereInput>;
};


export type MutationUpdateManyTimestampArgs = {
  data: TimestampUpdateManyMutationInput;
  where?: InputMaybe<TimestampWhereInput>;
};


export type MutationUpdateOneAttestationArgs = {
  data: AttestationUpdateInput;
  where: AttestationWhereUniqueInput;
};


export type MutationUpdateOneEnsNameArgs = {
  data: EnsNameUpdateInput;
  where: EnsNameWhereUniqueInput;
};


export type MutationUpdateOneOffchainRevocationArgs = {
  data: OffchainRevocationUpdateInput;
  where: OffchainRevocationWhereUniqueInput;
};


export type MutationUpdateOneSchemaArgs = {
  data: SchemaUpdateInput;
  where: SchemaWhereUniqueInput;
};


export type MutationUpdateOneSchemaNameArgs = {
  data: SchemaNameUpdateInput;
  where: SchemaNameWhereUniqueInput;
};


export type MutationUpdateOneServiceStatArgs = {
  data: ServiceStatUpdateInput;
  where: ServiceStatWhereUniqueInput;
};


export type MutationUpdateOneTimestampArgs = {
  data: TimestampUpdateInput;
  where: TimestampWhereUniqueInput;
};


export type MutationUpsertOneAttestationArgs = {
  create: AttestationCreateInput;
  update: AttestationUpdateInput;
  where: AttestationWhereUniqueInput;
};


export type MutationUpsertOneEnsNameArgs = {
  create: EnsNameCreateInput;
  update: EnsNameUpdateInput;
  where: EnsNameWhereUniqueInput;
};


export type MutationUpsertOneOffchainRevocationArgs = {
  create: OffchainRevocationCreateInput;
  update: OffchainRevocationUpdateInput;
  where: OffchainRevocationWhereUniqueInput;
};


export type MutationUpsertOneSchemaArgs = {
  create: SchemaCreateInput;
  update: SchemaUpdateInput;
  where: SchemaWhereUniqueInput;
};


export type MutationUpsertOneSchemaNameArgs = {
  create: SchemaNameCreateInput;
  update: SchemaNameUpdateInput;
  where: SchemaNameWhereUniqueInput;
};


export type MutationUpsertOneServiceStatArgs = {
  create: ServiceStatCreateInput;
  update: ServiceStatUpdateInput;
  where: ServiceStatWhereUniqueInput;
};


export type MutationUpsertOneTimestampArgs = {
  create: TimestampCreateInput;
  update: TimestampUpdateInput;
  where: TimestampWhereUniqueInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type OffchainRevocation = {
  __typename?: 'OffchainRevocation';
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  txid: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

export type OffchainRevocationAvgAggregate = {
  __typename?: 'OffchainRevocationAvgAggregate';
  timestamp?: Maybe<Scalars['Float']['output']>;
};

export type OffchainRevocationAvgOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>;
};

export type OffchainRevocationCountAggregate = {
  __typename?: 'OffchainRevocationCountAggregate';
  _all: Scalars['Int']['output'];
  from: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  timestamp: Scalars['Int']['output'];
  txid: Scalars['Int']['output'];
  uid: Scalars['Int']['output'];
};

export type OffchainRevocationCountOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
};

export type OffchainRevocationCreateInput = {
  from: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type OffchainRevocationCreateManyInput = {
  from: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type OffchainRevocationGroupBy = {
  __typename?: 'OffchainRevocationGroupBy';
  _avg?: Maybe<OffchainRevocationAvgAggregate>;
  _count?: Maybe<OffchainRevocationCountAggregate>;
  _max?: Maybe<OffchainRevocationMaxAggregate>;
  _min?: Maybe<OffchainRevocationMinAggregate>;
  _sum?: Maybe<OffchainRevocationSumAggregate>;
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  txid: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

export type OffchainRevocationMaxAggregate = {
  __typename?: 'OffchainRevocationMaxAggregate';
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  txid?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
};

export type OffchainRevocationMaxOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
};

export type OffchainRevocationMinAggregate = {
  __typename?: 'OffchainRevocationMinAggregate';
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  txid?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
};

export type OffchainRevocationMinOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
};

export type OffchainRevocationOrderByWithAggregationInput = {
  _avg?: InputMaybe<OffchainRevocationAvgOrderByAggregateInput>;
  _count?: InputMaybe<OffchainRevocationCountOrderByAggregateInput>;
  _max?: InputMaybe<OffchainRevocationMaxOrderByAggregateInput>;
  _min?: InputMaybe<OffchainRevocationMinOrderByAggregateInput>;
  _sum?: InputMaybe<OffchainRevocationSumOrderByAggregateInput>;
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
};

export type OffchainRevocationOrderByWithRelationInput = {
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
};

export enum OffchainRevocationScalarFieldEnum {
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  Txid = 'txid',
  Uid = 'uid'
}

export type OffchainRevocationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<OffchainRevocationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<OffchainRevocationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<OffchainRevocationScalarWhereWithAggregatesInput>>;
  from?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  timestamp?: InputMaybe<IntWithAggregatesFilter>;
  txid?: InputMaybe<StringWithAggregatesFilter>;
  uid?: InputMaybe<StringWithAggregatesFilter>;
};

export type OffchainRevocationSumAggregate = {
  __typename?: 'OffchainRevocationSumAggregate';
  timestamp?: Maybe<Scalars['Int']['output']>;
};

export type OffchainRevocationSumOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>;
};

export type OffchainRevocationUpdateInput = {
  from?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
  uid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type OffchainRevocationUpdateManyMutationInput = {
  from?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
  uid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type OffchainRevocationWhereInput = {
  AND?: InputMaybe<Array<OffchainRevocationWhereInput>>;
  NOT?: InputMaybe<Array<OffchainRevocationWhereInput>>;
  OR?: InputMaybe<Array<OffchainRevocationWhereInput>>;
  from?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<IntFilter>;
  txid?: InputMaybe<StringFilter>;
  uid?: InputMaybe<StringFilter>;
};

export type OffchainRevocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  aggregateAttestation: AggregateAttestation;
  aggregateEnsName: AggregateEnsName;
  aggregateOffchainRevocation: AggregateOffchainRevocation;
  aggregateSchema: AggregateSchema;
  aggregateSchemaName: AggregateSchemaName;
  aggregateServiceStat: AggregateServiceStat;
  aggregateTimestamp: AggregateTimestamp;
  attestation?: Maybe<Attestation>;
  attestations: Array<Attestation>;
  ensName?: Maybe<EnsName>;
  ensNames: Array<EnsName>;
  findFirstAttestation?: Maybe<Attestation>;
  findFirstAttestationOrThrow?: Maybe<Attestation>;
  findFirstEnsName?: Maybe<EnsName>;
  findFirstEnsNameOrThrow?: Maybe<EnsName>;
  findFirstOffchainRevocation?: Maybe<OffchainRevocation>;
  findFirstOffchainRevocationOrThrow?: Maybe<OffchainRevocation>;
  findFirstSchema?: Maybe<Schema>;
  findFirstSchemaName?: Maybe<SchemaName>;
  findFirstSchemaNameOrThrow?: Maybe<SchemaName>;
  findFirstSchemaOrThrow?: Maybe<Schema>;
  findFirstServiceStat?: Maybe<ServiceStat>;
  findFirstServiceStatOrThrow?: Maybe<ServiceStat>;
  findFirstTimestamp?: Maybe<Timestamp>;
  findFirstTimestampOrThrow?: Maybe<Timestamp>;
  getAttestation?: Maybe<Attestation>;
  getEnsName?: Maybe<EnsName>;
  getOffchainRevocation?: Maybe<OffchainRevocation>;
  getSchema?: Maybe<Schema>;
  getSchemaName?: Maybe<SchemaName>;
  getServiceStat?: Maybe<ServiceStat>;
  getTimestamp?: Maybe<Timestamp>;
  groupByAttestation: Array<AttestationGroupBy>;
  groupByEnsName: Array<EnsNameGroupBy>;
  groupByOffchainRevocation: Array<OffchainRevocationGroupBy>;
  groupBySchema: Array<SchemaGroupBy>;
  groupBySchemaName: Array<SchemaNameGroupBy>;
  groupByServiceStat: Array<ServiceStatGroupBy>;
  groupByTimestamp: Array<TimestampGroupBy>;
  offchainRevocation?: Maybe<OffchainRevocation>;
  offchainRevocations: Array<OffchainRevocation>;
  schema?: Maybe<Schema>;
  schemaName?: Maybe<SchemaName>;
  schemaNames: Array<SchemaName>;
  schemata: Array<Schema>;
  serviceStat?: Maybe<ServiceStat>;
  serviceStats: Array<ServiceStat>;
  timestamp?: Maybe<Timestamp>;
  timestamps: Array<Timestamp>;
};


export type QueryAggregateAttestationArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AttestationWhereInput>;
};


export type QueryAggregateEnsNameArgs = {
  cursor?: InputMaybe<EnsNameWhereUniqueInput>;
  orderBy?: InputMaybe<Array<EnsNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EnsNameWhereInput>;
};


export type QueryAggregateOffchainRevocationArgs = {
  cursor?: InputMaybe<OffchainRevocationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OffchainRevocationWhereInput>;
};


export type QueryAggregateSchemaArgs = {
  cursor?: InputMaybe<SchemaWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SchemaOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaWhereInput>;
};


export type QueryAggregateSchemaNameArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>;
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaNameWhereInput>;
};


export type QueryAggregateServiceStatArgs = {
  cursor?: InputMaybe<ServiceStatWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ServiceStatWhereInput>;
};


export type QueryAggregateTimestampArgs = {
  cursor?: InputMaybe<TimestampWhereUniqueInput>;
  orderBy?: InputMaybe<Array<TimestampOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TimestampWhereInput>;
};


export type QueryAttestationArgs = {
  where: AttestationWhereUniqueInput;
};


export type QueryAttestationsArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AttestationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AttestationWhereInput>;
};


export type QueryEnsNameArgs = {
  where: EnsNameWhereUniqueInput;
};


export type QueryEnsNamesArgs = {
  cursor?: InputMaybe<EnsNameWhereUniqueInput>;
  distinct?: InputMaybe<Array<EnsNameScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EnsNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EnsNameWhereInput>;
};


export type QueryFindFirstAttestationArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AttestationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AttestationWhereInput>;
};


export type QueryFindFirstAttestationOrThrowArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AttestationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AttestationWhereInput>;
};


export type QueryFindFirstEnsNameArgs = {
  cursor?: InputMaybe<EnsNameWhereUniqueInput>;
  distinct?: InputMaybe<Array<EnsNameScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EnsNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EnsNameWhereInput>;
};


export type QueryFindFirstEnsNameOrThrowArgs = {
  cursor?: InputMaybe<EnsNameWhereUniqueInput>;
  distinct?: InputMaybe<Array<EnsNameScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<EnsNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EnsNameWhereInput>;
};


export type QueryFindFirstOffchainRevocationArgs = {
  cursor?: InputMaybe<OffchainRevocationWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffchainRevocationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OffchainRevocationWhereInput>;
};


export type QueryFindFirstOffchainRevocationOrThrowArgs = {
  cursor?: InputMaybe<OffchainRevocationWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffchainRevocationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OffchainRevocationWhereInput>;
};


export type QueryFindFirstSchemaArgs = {
  cursor?: InputMaybe<SchemaWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemaScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemaOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaWhereInput>;
};


export type QueryFindFirstSchemaNameArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemaNameScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaNameWhereInput>;
};


export type QueryFindFirstSchemaNameOrThrowArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemaNameScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaNameWhereInput>;
};


export type QueryFindFirstSchemaOrThrowArgs = {
  cursor?: InputMaybe<SchemaWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemaScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemaOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaWhereInput>;
};


export type QueryFindFirstServiceStatArgs = {
  cursor?: InputMaybe<ServiceStatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ServiceStatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ServiceStatWhereInput>;
};


export type QueryFindFirstServiceStatOrThrowArgs = {
  cursor?: InputMaybe<ServiceStatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ServiceStatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ServiceStatWhereInput>;
};


export type QueryFindFirstTimestampArgs = {
  cursor?: InputMaybe<TimestampWhereUniqueInput>;
  distinct?: InputMaybe<Array<TimestampScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TimestampOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TimestampWhereInput>;
};


export type QueryFindFirstTimestampOrThrowArgs = {
  cursor?: InputMaybe<TimestampWhereUniqueInput>;
  distinct?: InputMaybe<Array<TimestampScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TimestampOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TimestampWhereInput>;
};


export type QueryGetAttestationArgs = {
  where: AttestationWhereUniqueInput;
};


export type QueryGetEnsNameArgs = {
  where: EnsNameWhereUniqueInput;
};


export type QueryGetOffchainRevocationArgs = {
  where: OffchainRevocationWhereUniqueInput;
};


export type QueryGetSchemaArgs = {
  where: SchemaWhereUniqueInput;
};


export type QueryGetSchemaNameArgs = {
  where: SchemaNameWhereUniqueInput;
};


export type QueryGetServiceStatArgs = {
  where: ServiceStatWhereUniqueInput;
};


export type QueryGetTimestampArgs = {
  where: TimestampWhereUniqueInput;
};


export type QueryGroupByAttestationArgs = {
  by: Array<AttestationScalarFieldEnum>;
  having?: InputMaybe<AttestationScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<AttestationOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AttestationWhereInput>;
};


export type QueryGroupByEnsNameArgs = {
  by: Array<EnsNameScalarFieldEnum>;
  having?: InputMaybe<EnsNameScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<EnsNameOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EnsNameWhereInput>;
};


export type QueryGroupByOffchainRevocationArgs = {
  by: Array<OffchainRevocationScalarFieldEnum>;
  having?: InputMaybe<OffchainRevocationScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OffchainRevocationWhereInput>;
};


export type QueryGroupBySchemaArgs = {
  by: Array<SchemaScalarFieldEnum>;
  having?: InputMaybe<SchemaScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SchemaOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaWhereInput>;
};


export type QueryGroupBySchemaNameArgs = {
  by: Array<SchemaNameScalarFieldEnum>;
  having?: InputMaybe<SchemaNameScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaNameWhereInput>;
};


export type QueryGroupByServiceStatArgs = {
  by: Array<ServiceStatScalarFieldEnum>;
  having?: InputMaybe<ServiceStatScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ServiceStatWhereInput>;
};


export type QueryGroupByTimestampArgs = {
  by: Array<TimestampScalarFieldEnum>;
  having?: InputMaybe<TimestampScalarWhereWithAggregatesInput>;
  orderBy?: InputMaybe<Array<TimestampOrderByWithAggregationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TimestampWhereInput>;
};


export type QueryOffchainRevocationArgs = {
  where: OffchainRevocationWhereUniqueInput;
};


export type QueryOffchainRevocationsArgs = {
  cursor?: InputMaybe<OffchainRevocationWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffchainRevocationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OffchainRevocationWhereInput>;
};


export type QuerySchemaArgs = {
  where: SchemaWhereUniqueInput;
};


export type QuerySchemaNameArgs = {
  where: SchemaNameWhereUniqueInput;
};


export type QuerySchemaNamesArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemaNameScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaNameWhereInput>;
};


export type QuerySchemataArgs = {
  cursor?: InputMaybe<SchemaWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemaScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemaOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaWhereInput>;
};


export type QueryServiceStatArgs = {
  where: ServiceStatWhereUniqueInput;
};


export type QueryServiceStatsArgs = {
  cursor?: InputMaybe<ServiceStatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ServiceStatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ServiceStatWhereInput>;
};


export type QueryTimestampArgs = {
  where: TimestampWhereUniqueInput;
};


export type QueryTimestampsArgs = {
  cursor?: InputMaybe<TimestampWhereUniqueInput>;
  distinct?: InputMaybe<Array<TimestampScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TimestampOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TimestampWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Schema = {
  __typename?: 'Schema';
  _count?: Maybe<SchemaCount>;
  attestations: Array<Attestation>;
  creator: Scalars['String']['output'];
  id: Scalars['String']['output'];
  index: Scalars['String']['output'];
  resolver: Scalars['String']['output'];
  revocable: Scalars['Boolean']['output'];
  schema: Scalars['String']['output'];
  schemaNames: Array<SchemaName>;
  time: Scalars['Int']['output'];
  txid: Scalars['String']['output'];
};


export type SchemaAttestationsArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AttestationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AttestationWhereInput>;
};


export type SchemaSchemaNamesArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemaNameScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SchemaNameWhereInput>;
};

export type SchemaAvgAggregate = {
  __typename?: 'SchemaAvgAggregate';
  time?: Maybe<Scalars['Float']['output']>;
};

export type SchemaAvgOrderByAggregateInput = {
  time?: InputMaybe<SortOrder>;
};

export type SchemaCount = {
  __typename?: 'SchemaCount';
  attestations: Scalars['Int']['output'];
  schemaNames: Scalars['Int']['output'];
};

export type SchemaCountAggregate = {
  __typename?: 'SchemaCountAggregate';
  _all: Scalars['Int']['output'];
  creator: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  index: Scalars['Int']['output'];
  resolver: Scalars['Int']['output'];
  revocable: Scalars['Int']['output'];
  schema: Scalars['Int']['output'];
  time: Scalars['Int']['output'];
  txid: Scalars['Int']['output'];
};

export type SchemaCountOrderByAggregateInput = {
  creator?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  index?: InputMaybe<SortOrder>;
  resolver?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  schema?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type SchemaCreateInput = {
  attestations?: InputMaybe<AttestationCreateNestedManyWithoutSchemaInput>;
  creator: Scalars['String']['input'];
  id: Scalars['String']['input'];
  index: Scalars['String']['input'];
  resolver: Scalars['String']['input'];
  revocable: Scalars['Boolean']['input'];
  schema: Scalars['String']['input'];
  schemaNames?: InputMaybe<SchemaNameCreateNestedManyWithoutSchemaInput>;
  time: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
};

export type SchemaCreateManyInput = {
  creator: Scalars['String']['input'];
  id: Scalars['String']['input'];
  index: Scalars['String']['input'];
  resolver: Scalars['String']['input'];
  revocable: Scalars['Boolean']['input'];
  schema: Scalars['String']['input'];
  time: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
};

export type SchemaCreateNestedOneWithoutAttestationsInput = {
  connect?: InputMaybe<SchemaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemaCreateOrConnectWithoutAttestationsInput>;
  create?: InputMaybe<SchemaCreateWithoutAttestationsInput>;
};

export type SchemaCreateNestedOneWithoutSchemaNamesInput = {
  connect?: InputMaybe<SchemaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemaCreateOrConnectWithoutSchemaNamesInput>;
  create?: InputMaybe<SchemaCreateWithoutSchemaNamesInput>;
};

export type SchemaCreateOrConnectWithoutAttestationsInput = {
  create: SchemaCreateWithoutAttestationsInput;
  where: SchemaWhereUniqueInput;
};

export type SchemaCreateOrConnectWithoutSchemaNamesInput = {
  create: SchemaCreateWithoutSchemaNamesInput;
  where: SchemaWhereUniqueInput;
};

export type SchemaCreateWithoutAttestationsInput = {
  creator: Scalars['String']['input'];
  id: Scalars['String']['input'];
  index: Scalars['String']['input'];
  resolver: Scalars['String']['input'];
  revocable: Scalars['Boolean']['input'];
  schema: Scalars['String']['input'];
  schemaNames?: InputMaybe<SchemaNameCreateNestedManyWithoutSchemaInput>;
  time: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
};

export type SchemaCreateWithoutSchemaNamesInput = {
  attestations?: InputMaybe<AttestationCreateNestedManyWithoutSchemaInput>;
  creator: Scalars['String']['input'];
  id: Scalars['String']['input'];
  index: Scalars['String']['input'];
  resolver: Scalars['String']['input'];
  revocable: Scalars['Boolean']['input'];
  schema: Scalars['String']['input'];
  time: Scalars['Int']['input'];
  txid: Scalars['String']['input'];
};

export type SchemaGroupBy = {
  __typename?: 'SchemaGroupBy';
  _avg?: Maybe<SchemaAvgAggregate>;
  _count?: Maybe<SchemaCountAggregate>;
  _max?: Maybe<SchemaMaxAggregate>;
  _min?: Maybe<SchemaMinAggregate>;
  _sum?: Maybe<SchemaSumAggregate>;
  creator: Scalars['String']['output'];
  id: Scalars['String']['output'];
  index: Scalars['String']['output'];
  resolver: Scalars['String']['output'];
  revocable: Scalars['Boolean']['output'];
  schema: Scalars['String']['output'];
  time: Scalars['Int']['output'];
  txid: Scalars['String']['output'];
};

export type SchemaMaxAggregate = {
  __typename?: 'SchemaMaxAggregate';
  creator?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['String']['output']>;
  resolver?: Maybe<Scalars['String']['output']>;
  revocable?: Maybe<Scalars['Boolean']['output']>;
  schema?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  txid?: Maybe<Scalars['String']['output']>;
};

export type SchemaMaxOrderByAggregateInput = {
  creator?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  index?: InputMaybe<SortOrder>;
  resolver?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  schema?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type SchemaMinAggregate = {
  __typename?: 'SchemaMinAggregate';
  creator?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['String']['output']>;
  resolver?: Maybe<Scalars['String']['output']>;
  revocable?: Maybe<Scalars['Boolean']['output']>;
  schema?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  txid?: Maybe<Scalars['String']['output']>;
};

export type SchemaMinOrderByAggregateInput = {
  creator?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  index?: InputMaybe<SortOrder>;
  resolver?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  schema?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type SchemaName = {
  __typename?: 'SchemaName';
  attesterAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isCreator: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  schema: Schema;
  schemaId: Scalars['String']['output'];
  time: Scalars['Int']['output'];
};

export type SchemaNameAvgAggregate = {
  __typename?: 'SchemaNameAvgAggregate';
  time?: Maybe<Scalars['Float']['output']>;
};

export type SchemaNameAvgOrderByAggregateInput = {
  time?: InputMaybe<SortOrder>;
};

export type SchemaNameCountAggregate = {
  __typename?: 'SchemaNameCountAggregate';
  _all: Scalars['Int']['output'];
  attesterAddress: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isCreator: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  schemaId: Scalars['Int']['output'];
  time: Scalars['Int']['output'];
};

export type SchemaNameCountOrderByAggregateInput = {
  attesterAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isCreator?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
};

export type SchemaNameCreateInput = {
  attesterAddress: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isCreator: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  schema: SchemaCreateNestedOneWithoutSchemaNamesInput;
  time: Scalars['Int']['input'];
};

export type SchemaNameCreateManyInput = {
  attesterAddress: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isCreator: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  schemaId: Scalars['String']['input'];
  time: Scalars['Int']['input'];
};

export type SchemaNameCreateManySchemaInput = {
  attesterAddress: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isCreator: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  time: Scalars['Int']['input'];
};

export type SchemaNameCreateManySchemaInputEnvelope = {
  data: Array<SchemaNameCreateManySchemaInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SchemaNameCreateNestedManyWithoutSchemaInput = {
  connect?: InputMaybe<Array<SchemaNameWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SchemaNameCreateOrConnectWithoutSchemaInput>>;
  create?: InputMaybe<Array<SchemaNameCreateWithoutSchemaInput>>;
  createMany?: InputMaybe<SchemaNameCreateManySchemaInputEnvelope>;
};

export type SchemaNameCreateOrConnectWithoutSchemaInput = {
  create: SchemaNameCreateWithoutSchemaInput;
  where: SchemaNameWhereUniqueInput;
};

export type SchemaNameCreateWithoutSchemaInput = {
  attesterAddress: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isCreator: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  time: Scalars['Int']['input'];
};

export type SchemaNameGroupBy = {
  __typename?: 'SchemaNameGroupBy';
  _avg?: Maybe<SchemaNameAvgAggregate>;
  _count?: Maybe<SchemaNameCountAggregate>;
  _max?: Maybe<SchemaNameMaxAggregate>;
  _min?: Maybe<SchemaNameMinAggregate>;
  _sum?: Maybe<SchemaNameSumAggregate>;
  attesterAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isCreator: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  schemaId: Scalars['String']['output'];
  time: Scalars['Int']['output'];
};

export type SchemaNameListRelationFilter = {
  every?: InputMaybe<SchemaNameWhereInput>;
  none?: InputMaybe<SchemaNameWhereInput>;
  some?: InputMaybe<SchemaNameWhereInput>;
};

export type SchemaNameMaxAggregate = {
  __typename?: 'SchemaNameMaxAggregate';
  attesterAddress?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isCreator?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  schemaId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
};

export type SchemaNameMaxOrderByAggregateInput = {
  attesterAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isCreator?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
};

export type SchemaNameMinAggregate = {
  __typename?: 'SchemaNameMinAggregate';
  attesterAddress?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isCreator?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  schemaId?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
};

export type SchemaNameMinOrderByAggregateInput = {
  attesterAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isCreator?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
};

export type SchemaNameOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SchemaNameOrderByWithAggregationInput = {
  _avg?: InputMaybe<SchemaNameAvgOrderByAggregateInput>;
  _count?: InputMaybe<SchemaNameCountOrderByAggregateInput>;
  _max?: InputMaybe<SchemaNameMaxOrderByAggregateInput>;
  _min?: InputMaybe<SchemaNameMinOrderByAggregateInput>;
  _sum?: InputMaybe<SchemaNameSumOrderByAggregateInput>;
  attesterAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isCreator?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
};

export type SchemaNameOrderByWithRelationInput = {
  attesterAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isCreator?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schema?: InputMaybe<SchemaOrderByWithRelationInput>;
  schemaId?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
};

export enum SchemaNameScalarFieldEnum {
  AttesterAddress = 'attesterAddress',
  Id = 'id',
  IsCreator = 'isCreator',
  Name = 'name',
  SchemaId = 'schemaId',
  Time = 'time'
}

export type SchemaNameScalarWhereInput = {
  AND?: InputMaybe<Array<SchemaNameScalarWhereInput>>;
  NOT?: InputMaybe<Array<SchemaNameScalarWhereInput>>;
  OR?: InputMaybe<Array<SchemaNameScalarWhereInput>>;
  attesterAddress?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isCreator?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  schemaId?: InputMaybe<StringFilter>;
  time?: InputMaybe<IntFilter>;
};

export type SchemaNameScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SchemaNameScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SchemaNameScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SchemaNameScalarWhereWithAggregatesInput>>;
  attesterAddress?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  isCreator?: InputMaybe<BoolWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  schemaId?: InputMaybe<StringWithAggregatesFilter>;
  time?: InputMaybe<IntWithAggregatesFilter>;
};

export type SchemaNameSumAggregate = {
  __typename?: 'SchemaNameSumAggregate';
  time?: Maybe<Scalars['Int']['output']>;
};

export type SchemaNameSumOrderByAggregateInput = {
  time?: InputMaybe<SortOrder>;
};

export type SchemaNameUpdateInput = {
  attesterAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isCreator?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  schema?: InputMaybe<SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type SchemaNameUpdateManyMutationInput = {
  attesterAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isCreator?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type SchemaNameUpdateManyWithWhereWithoutSchemaInput = {
  data: SchemaNameUpdateManyMutationInput;
  where: SchemaNameScalarWhereInput;
};

export type SchemaNameUpdateManyWithoutSchemaNestedInput = {
  connect?: InputMaybe<Array<SchemaNameWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SchemaNameCreateOrConnectWithoutSchemaInput>>;
  create?: InputMaybe<Array<SchemaNameCreateWithoutSchemaInput>>;
  createMany?: InputMaybe<SchemaNameCreateManySchemaInputEnvelope>;
  delete?: InputMaybe<Array<SchemaNameWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SchemaNameScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SchemaNameWhereUniqueInput>>;
  set?: InputMaybe<Array<SchemaNameWhereUniqueInput>>;
  update?: InputMaybe<Array<SchemaNameUpdateWithWhereUniqueWithoutSchemaInput>>;
  updateMany?: InputMaybe<Array<SchemaNameUpdateManyWithWhereWithoutSchemaInput>>;
  upsert?: InputMaybe<Array<SchemaNameUpsertWithWhereUniqueWithoutSchemaInput>>;
};

export type SchemaNameUpdateWithWhereUniqueWithoutSchemaInput = {
  data: SchemaNameUpdateWithoutSchemaInput;
  where: SchemaNameWhereUniqueInput;
};

export type SchemaNameUpdateWithoutSchemaInput = {
  attesterAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isCreator?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type SchemaNameUpsertWithWhereUniqueWithoutSchemaInput = {
  create: SchemaNameCreateWithoutSchemaInput;
  update: SchemaNameUpdateWithoutSchemaInput;
  where: SchemaNameWhereUniqueInput;
};

export type SchemaNameWhereInput = {
  AND?: InputMaybe<Array<SchemaNameWhereInput>>;
  NOT?: InputMaybe<Array<SchemaNameWhereInput>>;
  OR?: InputMaybe<Array<SchemaNameWhereInput>>;
  attesterAddress?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isCreator?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  schema?: InputMaybe<SchemaRelationFilter>;
  schemaId?: InputMaybe<StringFilter>;
  time?: InputMaybe<IntFilter>;
};

export type SchemaNameWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type SchemaOrderByWithAggregationInput = {
  _avg?: InputMaybe<SchemaAvgOrderByAggregateInput>;
  _count?: InputMaybe<SchemaCountOrderByAggregateInput>;
  _max?: InputMaybe<SchemaMaxOrderByAggregateInput>;
  _min?: InputMaybe<SchemaMinOrderByAggregateInput>;
  _sum?: InputMaybe<SchemaSumOrderByAggregateInput>;
  creator?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  index?: InputMaybe<SortOrder>;
  resolver?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  schema?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type SchemaOrderByWithRelationInput = {
  attestations?: InputMaybe<AttestationOrderByRelationAggregateInput>;
  creator?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  index?: InputMaybe<SortOrder>;
  resolver?: InputMaybe<SortOrder>;
  revocable?: InputMaybe<SortOrder>;
  schema?: InputMaybe<SortOrder>;
  schemaNames?: InputMaybe<SchemaNameOrderByRelationAggregateInput>;
  time?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type SchemaRelationFilter = {
  is?: InputMaybe<SchemaWhereInput>;
  isNot?: InputMaybe<SchemaWhereInput>;
};

export enum SchemaScalarFieldEnum {
  Creator = 'creator',
  Id = 'id',
  Index = 'index',
  Resolver = 'resolver',
  Revocable = 'revocable',
  Schema = 'schema',
  Time = 'time',
  Txid = 'txid'
}

export type SchemaScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SchemaScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<SchemaScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<SchemaScalarWhereWithAggregatesInput>>;
  creator?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  index?: InputMaybe<StringWithAggregatesFilter>;
  resolver?: InputMaybe<StringWithAggregatesFilter>;
  revocable?: InputMaybe<BoolWithAggregatesFilter>;
  schema?: InputMaybe<StringWithAggregatesFilter>;
  time?: InputMaybe<IntWithAggregatesFilter>;
  txid?: InputMaybe<StringWithAggregatesFilter>;
};

export type SchemaSumAggregate = {
  __typename?: 'SchemaSumAggregate';
  time?: Maybe<Scalars['Int']['output']>;
};

export type SchemaSumOrderByAggregateInput = {
  time?: InputMaybe<SortOrder>;
};

export type SchemaUpdateInput = {
  attestations?: InputMaybe<AttestationUpdateManyWithoutSchemaNestedInput>;
  creator?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  index?: InputMaybe<StringFieldUpdateOperationsInput>;
  resolver?: InputMaybe<StringFieldUpdateOperationsInput>;
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>;
  schema?: InputMaybe<StringFieldUpdateOperationsInput>;
  schemaNames?: InputMaybe<SchemaNameUpdateManyWithoutSchemaNestedInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SchemaUpdateManyMutationInput = {
  creator?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  index?: InputMaybe<StringFieldUpdateOperationsInput>;
  resolver?: InputMaybe<StringFieldUpdateOperationsInput>;
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>;
  schema?: InputMaybe<StringFieldUpdateOperationsInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SchemaUpdateOneRequiredWithoutAttestationsNestedInput = {
  connect?: InputMaybe<SchemaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemaCreateOrConnectWithoutAttestationsInput>;
  create?: InputMaybe<SchemaCreateWithoutAttestationsInput>;
  update?: InputMaybe<SchemaUpdateWithoutAttestationsInput>;
  upsert?: InputMaybe<SchemaUpsertWithoutAttestationsInput>;
};

export type SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput = {
  connect?: InputMaybe<SchemaWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemaCreateOrConnectWithoutSchemaNamesInput>;
  create?: InputMaybe<SchemaCreateWithoutSchemaNamesInput>;
  update?: InputMaybe<SchemaUpdateWithoutSchemaNamesInput>;
  upsert?: InputMaybe<SchemaUpsertWithoutSchemaNamesInput>;
};

export type SchemaUpdateWithoutAttestationsInput = {
  creator?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  index?: InputMaybe<StringFieldUpdateOperationsInput>;
  resolver?: InputMaybe<StringFieldUpdateOperationsInput>;
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>;
  schema?: InputMaybe<StringFieldUpdateOperationsInput>;
  schemaNames?: InputMaybe<SchemaNameUpdateManyWithoutSchemaNestedInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SchemaUpdateWithoutSchemaNamesInput = {
  attestations?: InputMaybe<AttestationUpdateManyWithoutSchemaNestedInput>;
  creator?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  index?: InputMaybe<StringFieldUpdateOperationsInput>;
  resolver?: InputMaybe<StringFieldUpdateOperationsInput>;
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>;
  schema?: InputMaybe<StringFieldUpdateOperationsInput>;
  time?: InputMaybe<IntFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type SchemaUpsertWithoutAttestationsInput = {
  create: SchemaCreateWithoutAttestationsInput;
  update: SchemaUpdateWithoutAttestationsInput;
};

export type SchemaUpsertWithoutSchemaNamesInput = {
  create: SchemaCreateWithoutSchemaNamesInput;
  update: SchemaUpdateWithoutSchemaNamesInput;
};

export type SchemaWhereInput = {
  AND?: InputMaybe<Array<SchemaWhereInput>>;
  NOT?: InputMaybe<Array<SchemaWhereInput>>;
  OR?: InputMaybe<Array<SchemaWhereInput>>;
  attestations?: InputMaybe<AttestationListRelationFilter>;
  creator?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  index?: InputMaybe<StringFilter>;
  resolver?: InputMaybe<StringFilter>;
  revocable?: InputMaybe<BoolFilter>;
  schema?: InputMaybe<StringFilter>;
  schemaNames?: InputMaybe<SchemaNameListRelationFilter>;
  time?: InputMaybe<IntFilter>;
  txid?: InputMaybe<StringFilter>;
};

export type SchemaWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceStat = {
  __typename?: 'ServiceStat';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ServiceStatCountAggregate = {
  __typename?: 'ServiceStatCountAggregate';
  _all: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

export type ServiceStatCountOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type ServiceStatCreateInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ServiceStatCreateManyInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ServiceStatGroupBy = {
  __typename?: 'ServiceStatGroupBy';
  _count?: Maybe<ServiceStatCountAggregate>;
  _max?: Maybe<ServiceStatMaxAggregate>;
  _min?: Maybe<ServiceStatMinAggregate>;
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ServiceStatMaxAggregate = {
  __typename?: 'ServiceStatMaxAggregate';
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ServiceStatMaxOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type ServiceStatMinAggregate = {
  __typename?: 'ServiceStatMinAggregate';
  name?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ServiceStatMinOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type ServiceStatOrderByWithAggregationInput = {
  _count?: InputMaybe<ServiceStatCountOrderByAggregateInput>;
  _max?: InputMaybe<ServiceStatMaxOrderByAggregateInput>;
  _min?: InputMaybe<ServiceStatMinOrderByAggregateInput>;
  name?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type ServiceStatOrderByWithRelationInput = {
  name?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export enum ServiceStatScalarFieldEnum {
  Name = 'name',
  Value = 'value'
}

export type ServiceStatScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ServiceStatScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ServiceStatScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ServiceStatScalarWhereWithAggregatesInput>>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  value?: InputMaybe<StringWithAggregatesFilter>;
};

export type ServiceStatUpdateInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  value?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ServiceStatUpdateManyMutationInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  value?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ServiceStatWhereInput = {
  AND?: InputMaybe<Array<ServiceStatWhereInput>>;
  NOT?: InputMaybe<Array<ServiceStatWhereInput>>;
  OR?: InputMaybe<Array<ServiceStatWhereInput>>;
  name?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

export type ServiceStatWhereUniqueInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Timestamp = {
  __typename?: 'Timestamp';
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  tree: Scalars['String']['output'];
  txid: Scalars['String']['output'];
};

export type TimestampAvgAggregate = {
  __typename?: 'TimestampAvgAggregate';
  timestamp?: Maybe<Scalars['Float']['output']>;
};

export type TimestampAvgOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>;
};

export type TimestampCountAggregate = {
  __typename?: 'TimestampCountAggregate';
  _all: Scalars['Int']['output'];
  from: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  timestamp: Scalars['Int']['output'];
  tree: Scalars['Int']['output'];
  txid: Scalars['Int']['output'];
};

export type TimestampCountOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  tree?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type TimestampCreateInput = {
  from: Scalars['String']['input'];
  id: Scalars['String']['input'];
  timestamp: Scalars['Int']['input'];
  tree?: InputMaybe<Scalars['String']['input']>;
  txid: Scalars['String']['input'];
};

export type TimestampCreateManyInput = {
  from: Scalars['String']['input'];
  id: Scalars['String']['input'];
  timestamp: Scalars['Int']['input'];
  tree?: InputMaybe<Scalars['String']['input']>;
  txid: Scalars['String']['input'];
};

export type TimestampGroupBy = {
  __typename?: 'TimestampGroupBy';
  _avg?: Maybe<TimestampAvgAggregate>;
  _count?: Maybe<TimestampCountAggregate>;
  _max?: Maybe<TimestampMaxAggregate>;
  _min?: Maybe<TimestampMinAggregate>;
  _sum?: Maybe<TimestampSumAggregate>;
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  tree: Scalars['String']['output'];
  txid: Scalars['String']['output'];
};

export type TimestampMaxAggregate = {
  __typename?: 'TimestampMaxAggregate';
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  tree?: Maybe<Scalars['String']['output']>;
  txid?: Maybe<Scalars['String']['output']>;
};

export type TimestampMaxOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  tree?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type TimestampMinAggregate = {
  __typename?: 'TimestampMinAggregate';
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  tree?: Maybe<Scalars['String']['output']>;
  txid?: Maybe<Scalars['String']['output']>;
};

export type TimestampMinOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  tree?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type TimestampOrderByWithAggregationInput = {
  _avg?: InputMaybe<TimestampAvgOrderByAggregateInput>;
  _count?: InputMaybe<TimestampCountOrderByAggregateInput>;
  _max?: InputMaybe<TimestampMaxOrderByAggregateInput>;
  _min?: InputMaybe<TimestampMinOrderByAggregateInput>;
  _sum?: InputMaybe<TimestampSumOrderByAggregateInput>;
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  tree?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export type TimestampOrderByWithRelationInput = {
  from?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
  tree?: InputMaybe<SortOrder>;
  txid?: InputMaybe<SortOrder>;
};

export enum TimestampScalarFieldEnum {
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  Tree = 'tree',
  Txid = 'txid'
}

export type TimestampScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TimestampScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TimestampScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TimestampScalarWhereWithAggregatesInput>>;
  from?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  timestamp?: InputMaybe<IntWithAggregatesFilter>;
  tree?: InputMaybe<StringWithAggregatesFilter>;
  txid?: InputMaybe<StringWithAggregatesFilter>;
};

export type TimestampSumAggregate = {
  __typename?: 'TimestampSumAggregate';
  timestamp?: Maybe<Scalars['Int']['output']>;
};

export type TimestampSumOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>;
};

export type TimestampUpdateInput = {
  from?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>;
  tree?: InputMaybe<StringFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TimestampUpdateManyMutationInput = {
  from?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>;
  tree?: InputMaybe<StringFieldUpdateOperationsInput>;
  txid?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TimestampWhereInput = {
  AND?: InputMaybe<Array<TimestampWhereInput>>;
  NOT?: InputMaybe<Array<TimestampWhereInput>>;
  OR?: InputMaybe<Array<TimestampWhereInput>>;
  from?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<IntFilter>;
  tree?: InputMaybe<StringFilter>;
  txid?: InputMaybe<StringFilter>;
};

export type TimestampWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AffectedRowsOutput: ResolverTypeWrapper<AffectedRowsOutput>;
  AggregateAttestation: ResolverTypeWrapper<AggregateAttestation>;
  AggregateEnsName: ResolverTypeWrapper<AggregateEnsName>;
  AggregateOffchainRevocation: ResolverTypeWrapper<AggregateOffchainRevocation>;
  AggregateSchema: ResolverTypeWrapper<AggregateSchema>;
  AggregateSchemaName: ResolverTypeWrapper<AggregateSchemaName>;
  AggregateServiceStat: ResolverTypeWrapper<AggregateServiceStat>;
  AggregateTimestamp: ResolverTypeWrapper<AggregateTimestamp>;
  Attestation: ResolverTypeWrapper<Attestation>;
  AttestationAvgAggregate: ResolverTypeWrapper<AttestationAvgAggregate>;
  AttestationAvgOrderByAggregateInput: AttestationAvgOrderByAggregateInput;
  AttestationCountAggregate: ResolverTypeWrapper<AttestationCountAggregate>;
  AttestationCountOrderByAggregateInput: AttestationCountOrderByAggregateInput;
  AttestationCreateInput: AttestationCreateInput;
  AttestationCreateManyInput: AttestationCreateManyInput;
  AttestationCreateManySchemaInput: AttestationCreateManySchemaInput;
  AttestationCreateManySchemaInputEnvelope: AttestationCreateManySchemaInputEnvelope;
  AttestationCreateNestedManyWithoutSchemaInput: AttestationCreateNestedManyWithoutSchemaInput;
  AttestationCreateOrConnectWithoutSchemaInput: AttestationCreateOrConnectWithoutSchemaInput;
  AttestationCreateWithoutSchemaInput: AttestationCreateWithoutSchemaInput;
  AttestationGroupBy: ResolverTypeWrapper<AttestationGroupBy>;
  AttestationListRelationFilter: AttestationListRelationFilter;
  AttestationMaxAggregate: ResolverTypeWrapper<AttestationMaxAggregate>;
  AttestationMaxOrderByAggregateInput: AttestationMaxOrderByAggregateInput;
  AttestationMinAggregate: ResolverTypeWrapper<AttestationMinAggregate>;
  AttestationMinOrderByAggregateInput: AttestationMinOrderByAggregateInput;
  AttestationOrderByRelationAggregateInput: AttestationOrderByRelationAggregateInput;
  AttestationOrderByWithAggregationInput: AttestationOrderByWithAggregationInput;
  AttestationOrderByWithRelationInput: AttestationOrderByWithRelationInput;
  AttestationScalarFieldEnum: AttestationScalarFieldEnum;
  AttestationScalarWhereInput: AttestationScalarWhereInput;
  AttestationScalarWhereWithAggregatesInput: AttestationScalarWhereWithAggregatesInput;
  AttestationSumAggregate: ResolverTypeWrapper<AttestationSumAggregate>;
  AttestationSumOrderByAggregateInput: AttestationSumOrderByAggregateInput;
  AttestationUpdateInput: AttestationUpdateInput;
  AttestationUpdateManyMutationInput: AttestationUpdateManyMutationInput;
  AttestationUpdateManyWithWhereWithoutSchemaInput: AttestationUpdateManyWithWhereWithoutSchemaInput;
  AttestationUpdateManyWithoutSchemaNestedInput: AttestationUpdateManyWithoutSchemaNestedInput;
  AttestationUpdateWithWhereUniqueWithoutSchemaInput: AttestationUpdateWithWhereUniqueWithoutSchemaInput;
  AttestationUpdateWithoutSchemaInput: AttestationUpdateWithoutSchemaInput;
  AttestationUpsertWithWhereUniqueWithoutSchemaInput: AttestationUpsertWithWhereUniqueWithoutSchemaInput;
  AttestationWhereInput: AttestationWhereInput;
  AttestationWhereUniqueInput: AttestationWhereUniqueInput;
  BoolFieldUpdateOperationsInput: BoolFieldUpdateOperationsInput;
  BoolFilter: BoolFilter;
  BoolWithAggregatesFilter: BoolWithAggregatesFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  EnsName: ResolverTypeWrapper<EnsName>;
  EnsNameAvgAggregate: ResolverTypeWrapper<EnsNameAvgAggregate>;
  EnsNameAvgOrderByAggregateInput: EnsNameAvgOrderByAggregateInput;
  EnsNameCountAggregate: ResolverTypeWrapper<EnsNameCountAggregate>;
  EnsNameCountOrderByAggregateInput: EnsNameCountOrderByAggregateInput;
  EnsNameCreateInput: EnsNameCreateInput;
  EnsNameCreateManyInput: EnsNameCreateManyInput;
  EnsNameGroupBy: ResolverTypeWrapper<EnsNameGroupBy>;
  EnsNameMaxAggregate: ResolverTypeWrapper<EnsNameMaxAggregate>;
  EnsNameMaxOrderByAggregateInput: EnsNameMaxOrderByAggregateInput;
  EnsNameMinAggregate: ResolverTypeWrapper<EnsNameMinAggregate>;
  EnsNameMinOrderByAggregateInput: EnsNameMinOrderByAggregateInput;
  EnsNameOrderByWithAggregationInput: EnsNameOrderByWithAggregationInput;
  EnsNameOrderByWithRelationInput: EnsNameOrderByWithRelationInput;
  EnsNameScalarFieldEnum: EnsNameScalarFieldEnum;
  EnsNameScalarWhereWithAggregatesInput: EnsNameScalarWhereWithAggregatesInput;
  EnsNameSumAggregate: ResolverTypeWrapper<EnsNameSumAggregate>;
  EnsNameSumOrderByAggregateInput: EnsNameSumOrderByAggregateInput;
  EnsNameUpdateInput: EnsNameUpdateInput;
  EnsNameUpdateManyMutationInput: EnsNameUpdateManyMutationInput;
  EnsNameWhereInput: EnsNameWhereInput;
  EnsNameWhereUniqueInput: EnsNameWhereUniqueInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntFieldUpdateOperationsInput: IntFieldUpdateOperationsInput;
  IntFilter: IntFilter;
  IntWithAggregatesFilter: IntWithAggregatesFilter;
  Mutation: ResolverTypeWrapper<{}>;
  NestedBoolFilter: NestedBoolFilter;
  NestedBoolWithAggregatesFilter: NestedBoolWithAggregatesFilter;
  NestedFloatFilter: NestedFloatFilter;
  NestedIntFilter: NestedIntFilter;
  NestedIntWithAggregatesFilter: NestedIntWithAggregatesFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringWithAggregatesFilter: NestedStringWithAggregatesFilter;
  OffchainRevocation: ResolverTypeWrapper<OffchainRevocation>;
  OffchainRevocationAvgAggregate: ResolverTypeWrapper<OffchainRevocationAvgAggregate>;
  OffchainRevocationAvgOrderByAggregateInput: OffchainRevocationAvgOrderByAggregateInput;
  OffchainRevocationCountAggregate: ResolverTypeWrapper<OffchainRevocationCountAggregate>;
  OffchainRevocationCountOrderByAggregateInput: OffchainRevocationCountOrderByAggregateInput;
  OffchainRevocationCreateInput: OffchainRevocationCreateInput;
  OffchainRevocationCreateManyInput: OffchainRevocationCreateManyInput;
  OffchainRevocationGroupBy: ResolverTypeWrapper<OffchainRevocationGroupBy>;
  OffchainRevocationMaxAggregate: ResolverTypeWrapper<OffchainRevocationMaxAggregate>;
  OffchainRevocationMaxOrderByAggregateInput: OffchainRevocationMaxOrderByAggregateInput;
  OffchainRevocationMinAggregate: ResolverTypeWrapper<OffchainRevocationMinAggregate>;
  OffchainRevocationMinOrderByAggregateInput: OffchainRevocationMinOrderByAggregateInput;
  OffchainRevocationOrderByWithAggregationInput: OffchainRevocationOrderByWithAggregationInput;
  OffchainRevocationOrderByWithRelationInput: OffchainRevocationOrderByWithRelationInput;
  OffchainRevocationScalarFieldEnum: OffchainRevocationScalarFieldEnum;
  OffchainRevocationScalarWhereWithAggregatesInput: OffchainRevocationScalarWhereWithAggregatesInput;
  OffchainRevocationSumAggregate: ResolverTypeWrapper<OffchainRevocationSumAggregate>;
  OffchainRevocationSumOrderByAggregateInput: OffchainRevocationSumOrderByAggregateInput;
  OffchainRevocationUpdateInput: OffchainRevocationUpdateInput;
  OffchainRevocationUpdateManyMutationInput: OffchainRevocationUpdateManyMutationInput;
  OffchainRevocationWhereInput: OffchainRevocationWhereInput;
  OffchainRevocationWhereUniqueInput: OffchainRevocationWhereUniqueInput;
  Query: ResolverTypeWrapper<{}>;
  QueryMode: QueryMode;
  Schema: ResolverTypeWrapper<Schema>;
  SchemaAvgAggregate: ResolverTypeWrapper<SchemaAvgAggregate>;
  SchemaAvgOrderByAggregateInput: SchemaAvgOrderByAggregateInput;
  SchemaCount: ResolverTypeWrapper<SchemaCount>;
  SchemaCountAggregate: ResolverTypeWrapper<SchemaCountAggregate>;
  SchemaCountOrderByAggregateInput: SchemaCountOrderByAggregateInput;
  SchemaCreateInput: SchemaCreateInput;
  SchemaCreateManyInput: SchemaCreateManyInput;
  SchemaCreateNestedOneWithoutAttestationsInput: SchemaCreateNestedOneWithoutAttestationsInput;
  SchemaCreateNestedOneWithoutSchemaNamesInput: SchemaCreateNestedOneWithoutSchemaNamesInput;
  SchemaCreateOrConnectWithoutAttestationsInput: SchemaCreateOrConnectWithoutAttestationsInput;
  SchemaCreateOrConnectWithoutSchemaNamesInput: SchemaCreateOrConnectWithoutSchemaNamesInput;
  SchemaCreateWithoutAttestationsInput: SchemaCreateWithoutAttestationsInput;
  SchemaCreateWithoutSchemaNamesInput: SchemaCreateWithoutSchemaNamesInput;
  SchemaGroupBy: ResolverTypeWrapper<SchemaGroupBy>;
  SchemaMaxAggregate: ResolverTypeWrapper<SchemaMaxAggregate>;
  SchemaMaxOrderByAggregateInput: SchemaMaxOrderByAggregateInput;
  SchemaMinAggregate: ResolverTypeWrapper<SchemaMinAggregate>;
  SchemaMinOrderByAggregateInput: SchemaMinOrderByAggregateInput;
  SchemaName: ResolverTypeWrapper<SchemaName>;
  SchemaNameAvgAggregate: ResolverTypeWrapper<SchemaNameAvgAggregate>;
  SchemaNameAvgOrderByAggregateInput: SchemaNameAvgOrderByAggregateInput;
  SchemaNameCountAggregate: ResolverTypeWrapper<SchemaNameCountAggregate>;
  SchemaNameCountOrderByAggregateInput: SchemaNameCountOrderByAggregateInput;
  SchemaNameCreateInput: SchemaNameCreateInput;
  SchemaNameCreateManyInput: SchemaNameCreateManyInput;
  SchemaNameCreateManySchemaInput: SchemaNameCreateManySchemaInput;
  SchemaNameCreateManySchemaInputEnvelope: SchemaNameCreateManySchemaInputEnvelope;
  SchemaNameCreateNestedManyWithoutSchemaInput: SchemaNameCreateNestedManyWithoutSchemaInput;
  SchemaNameCreateOrConnectWithoutSchemaInput: SchemaNameCreateOrConnectWithoutSchemaInput;
  SchemaNameCreateWithoutSchemaInput: SchemaNameCreateWithoutSchemaInput;
  SchemaNameGroupBy: ResolverTypeWrapper<SchemaNameGroupBy>;
  SchemaNameListRelationFilter: SchemaNameListRelationFilter;
  SchemaNameMaxAggregate: ResolverTypeWrapper<SchemaNameMaxAggregate>;
  SchemaNameMaxOrderByAggregateInput: SchemaNameMaxOrderByAggregateInput;
  SchemaNameMinAggregate: ResolverTypeWrapper<SchemaNameMinAggregate>;
  SchemaNameMinOrderByAggregateInput: SchemaNameMinOrderByAggregateInput;
  SchemaNameOrderByRelationAggregateInput: SchemaNameOrderByRelationAggregateInput;
  SchemaNameOrderByWithAggregationInput: SchemaNameOrderByWithAggregationInput;
  SchemaNameOrderByWithRelationInput: SchemaNameOrderByWithRelationInput;
  SchemaNameScalarFieldEnum: SchemaNameScalarFieldEnum;
  SchemaNameScalarWhereInput: SchemaNameScalarWhereInput;
  SchemaNameScalarWhereWithAggregatesInput: SchemaNameScalarWhereWithAggregatesInput;
  SchemaNameSumAggregate: ResolverTypeWrapper<SchemaNameSumAggregate>;
  SchemaNameSumOrderByAggregateInput: SchemaNameSumOrderByAggregateInput;
  SchemaNameUpdateInput: SchemaNameUpdateInput;
  SchemaNameUpdateManyMutationInput: SchemaNameUpdateManyMutationInput;
  SchemaNameUpdateManyWithWhereWithoutSchemaInput: SchemaNameUpdateManyWithWhereWithoutSchemaInput;
  SchemaNameUpdateManyWithoutSchemaNestedInput: SchemaNameUpdateManyWithoutSchemaNestedInput;
  SchemaNameUpdateWithWhereUniqueWithoutSchemaInput: SchemaNameUpdateWithWhereUniqueWithoutSchemaInput;
  SchemaNameUpdateWithoutSchemaInput: SchemaNameUpdateWithoutSchemaInput;
  SchemaNameUpsertWithWhereUniqueWithoutSchemaInput: SchemaNameUpsertWithWhereUniqueWithoutSchemaInput;
  SchemaNameWhereInput: SchemaNameWhereInput;
  SchemaNameWhereUniqueInput: SchemaNameWhereUniqueInput;
  SchemaOrderByWithAggregationInput: SchemaOrderByWithAggregationInput;
  SchemaOrderByWithRelationInput: SchemaOrderByWithRelationInput;
  SchemaRelationFilter: SchemaRelationFilter;
  SchemaScalarFieldEnum: SchemaScalarFieldEnum;
  SchemaScalarWhereWithAggregatesInput: SchemaScalarWhereWithAggregatesInput;
  SchemaSumAggregate: ResolverTypeWrapper<SchemaSumAggregate>;
  SchemaSumOrderByAggregateInput: SchemaSumOrderByAggregateInput;
  SchemaUpdateInput: SchemaUpdateInput;
  SchemaUpdateManyMutationInput: SchemaUpdateManyMutationInput;
  SchemaUpdateOneRequiredWithoutAttestationsNestedInput: SchemaUpdateOneRequiredWithoutAttestationsNestedInput;
  SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput: SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput;
  SchemaUpdateWithoutAttestationsInput: SchemaUpdateWithoutAttestationsInput;
  SchemaUpdateWithoutSchemaNamesInput: SchemaUpdateWithoutSchemaNamesInput;
  SchemaUpsertWithoutAttestationsInput: SchemaUpsertWithoutAttestationsInput;
  SchemaUpsertWithoutSchemaNamesInput: SchemaUpsertWithoutSchemaNamesInput;
  SchemaWhereInput: SchemaWhereInput;
  SchemaWhereUniqueInput: SchemaWhereUniqueInput;
  ServiceStat: ResolverTypeWrapper<ServiceStat>;
  ServiceStatCountAggregate: ResolverTypeWrapper<ServiceStatCountAggregate>;
  ServiceStatCountOrderByAggregateInput: ServiceStatCountOrderByAggregateInput;
  ServiceStatCreateInput: ServiceStatCreateInput;
  ServiceStatCreateManyInput: ServiceStatCreateManyInput;
  ServiceStatGroupBy: ResolverTypeWrapper<ServiceStatGroupBy>;
  ServiceStatMaxAggregate: ResolverTypeWrapper<ServiceStatMaxAggregate>;
  ServiceStatMaxOrderByAggregateInput: ServiceStatMaxOrderByAggregateInput;
  ServiceStatMinAggregate: ResolverTypeWrapper<ServiceStatMinAggregate>;
  ServiceStatMinOrderByAggregateInput: ServiceStatMinOrderByAggregateInput;
  ServiceStatOrderByWithAggregationInput: ServiceStatOrderByWithAggregationInput;
  ServiceStatOrderByWithRelationInput: ServiceStatOrderByWithRelationInput;
  ServiceStatScalarFieldEnum: ServiceStatScalarFieldEnum;
  ServiceStatScalarWhereWithAggregatesInput: ServiceStatScalarWhereWithAggregatesInput;
  ServiceStatUpdateInput: ServiceStatUpdateInput;
  ServiceStatUpdateManyMutationInput: ServiceStatUpdateManyMutationInput;
  ServiceStatWhereInput: ServiceStatWhereInput;
  ServiceStatWhereUniqueInput: ServiceStatWhereUniqueInput;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFieldUpdateOperationsInput: StringFieldUpdateOperationsInput;
  StringFilter: StringFilter;
  StringWithAggregatesFilter: StringWithAggregatesFilter;
  Timestamp: ResolverTypeWrapper<Timestamp>;
  TimestampAvgAggregate: ResolverTypeWrapper<TimestampAvgAggregate>;
  TimestampAvgOrderByAggregateInput: TimestampAvgOrderByAggregateInput;
  TimestampCountAggregate: ResolverTypeWrapper<TimestampCountAggregate>;
  TimestampCountOrderByAggregateInput: TimestampCountOrderByAggregateInput;
  TimestampCreateInput: TimestampCreateInput;
  TimestampCreateManyInput: TimestampCreateManyInput;
  TimestampGroupBy: ResolverTypeWrapper<TimestampGroupBy>;
  TimestampMaxAggregate: ResolverTypeWrapper<TimestampMaxAggregate>;
  TimestampMaxOrderByAggregateInput: TimestampMaxOrderByAggregateInput;
  TimestampMinAggregate: ResolverTypeWrapper<TimestampMinAggregate>;
  TimestampMinOrderByAggregateInput: TimestampMinOrderByAggregateInput;
  TimestampOrderByWithAggregationInput: TimestampOrderByWithAggregationInput;
  TimestampOrderByWithRelationInput: TimestampOrderByWithRelationInput;
  TimestampScalarFieldEnum: TimestampScalarFieldEnum;
  TimestampScalarWhereWithAggregatesInput: TimestampScalarWhereWithAggregatesInput;
  TimestampSumAggregate: ResolverTypeWrapper<TimestampSumAggregate>;
  TimestampSumOrderByAggregateInput: TimestampSumOrderByAggregateInput;
  TimestampUpdateInput: TimestampUpdateInput;
  TimestampUpdateManyMutationInput: TimestampUpdateManyMutationInput;
  TimestampWhereInput: TimestampWhereInput;
  TimestampWhereUniqueInput: TimestampWhereUniqueInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AffectedRowsOutput: AffectedRowsOutput;
  AggregateAttestation: AggregateAttestation;
  AggregateEnsName: AggregateEnsName;
  AggregateOffchainRevocation: AggregateOffchainRevocation;
  AggregateSchema: AggregateSchema;
  AggregateSchemaName: AggregateSchemaName;
  AggregateServiceStat: AggregateServiceStat;
  AggregateTimestamp: AggregateTimestamp;
  Attestation: Attestation;
  AttestationAvgAggregate: AttestationAvgAggregate;
  AttestationAvgOrderByAggregateInput: AttestationAvgOrderByAggregateInput;
  AttestationCountAggregate: AttestationCountAggregate;
  AttestationCountOrderByAggregateInput: AttestationCountOrderByAggregateInput;
  AttestationCreateInput: AttestationCreateInput;
  AttestationCreateManyInput: AttestationCreateManyInput;
  AttestationCreateManySchemaInput: AttestationCreateManySchemaInput;
  AttestationCreateManySchemaInputEnvelope: AttestationCreateManySchemaInputEnvelope;
  AttestationCreateNestedManyWithoutSchemaInput: AttestationCreateNestedManyWithoutSchemaInput;
  AttestationCreateOrConnectWithoutSchemaInput: AttestationCreateOrConnectWithoutSchemaInput;
  AttestationCreateWithoutSchemaInput: AttestationCreateWithoutSchemaInput;
  AttestationGroupBy: AttestationGroupBy;
  AttestationListRelationFilter: AttestationListRelationFilter;
  AttestationMaxAggregate: AttestationMaxAggregate;
  AttestationMaxOrderByAggregateInput: AttestationMaxOrderByAggregateInput;
  AttestationMinAggregate: AttestationMinAggregate;
  AttestationMinOrderByAggregateInput: AttestationMinOrderByAggregateInput;
  AttestationOrderByRelationAggregateInput: AttestationOrderByRelationAggregateInput;
  AttestationOrderByWithAggregationInput: AttestationOrderByWithAggregationInput;
  AttestationOrderByWithRelationInput: AttestationOrderByWithRelationInput;
  AttestationScalarWhereInput: AttestationScalarWhereInput;
  AttestationScalarWhereWithAggregatesInput: AttestationScalarWhereWithAggregatesInput;
  AttestationSumAggregate: AttestationSumAggregate;
  AttestationSumOrderByAggregateInput: AttestationSumOrderByAggregateInput;
  AttestationUpdateInput: AttestationUpdateInput;
  AttestationUpdateManyMutationInput: AttestationUpdateManyMutationInput;
  AttestationUpdateManyWithWhereWithoutSchemaInput: AttestationUpdateManyWithWhereWithoutSchemaInput;
  AttestationUpdateManyWithoutSchemaNestedInput: AttestationUpdateManyWithoutSchemaNestedInput;
  AttestationUpdateWithWhereUniqueWithoutSchemaInput: AttestationUpdateWithWhereUniqueWithoutSchemaInput;
  AttestationUpdateWithoutSchemaInput: AttestationUpdateWithoutSchemaInput;
  AttestationUpsertWithWhereUniqueWithoutSchemaInput: AttestationUpsertWithWhereUniqueWithoutSchemaInput;
  AttestationWhereInput: AttestationWhereInput;
  AttestationWhereUniqueInput: AttestationWhereUniqueInput;
  BoolFieldUpdateOperationsInput: BoolFieldUpdateOperationsInput;
  BoolFilter: BoolFilter;
  BoolWithAggregatesFilter: BoolWithAggregatesFilter;
  Boolean: Scalars['Boolean']['output'];
  EnsName: EnsName;
  EnsNameAvgAggregate: EnsNameAvgAggregate;
  EnsNameAvgOrderByAggregateInput: EnsNameAvgOrderByAggregateInput;
  EnsNameCountAggregate: EnsNameCountAggregate;
  EnsNameCountOrderByAggregateInput: EnsNameCountOrderByAggregateInput;
  EnsNameCreateInput: EnsNameCreateInput;
  EnsNameCreateManyInput: EnsNameCreateManyInput;
  EnsNameGroupBy: EnsNameGroupBy;
  EnsNameMaxAggregate: EnsNameMaxAggregate;
  EnsNameMaxOrderByAggregateInput: EnsNameMaxOrderByAggregateInput;
  EnsNameMinAggregate: EnsNameMinAggregate;
  EnsNameMinOrderByAggregateInput: EnsNameMinOrderByAggregateInput;
  EnsNameOrderByWithAggregationInput: EnsNameOrderByWithAggregationInput;
  EnsNameOrderByWithRelationInput: EnsNameOrderByWithRelationInput;
  EnsNameScalarWhereWithAggregatesInput: EnsNameScalarWhereWithAggregatesInput;
  EnsNameSumAggregate: EnsNameSumAggregate;
  EnsNameSumOrderByAggregateInput: EnsNameSumOrderByAggregateInput;
  EnsNameUpdateInput: EnsNameUpdateInput;
  EnsNameUpdateManyMutationInput: EnsNameUpdateManyMutationInput;
  EnsNameWhereInput: EnsNameWhereInput;
  EnsNameWhereUniqueInput: EnsNameWhereUniqueInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  IntFieldUpdateOperationsInput: IntFieldUpdateOperationsInput;
  IntFilter: IntFilter;
  IntWithAggregatesFilter: IntWithAggregatesFilter;
  Mutation: {};
  NestedBoolFilter: NestedBoolFilter;
  NestedBoolWithAggregatesFilter: NestedBoolWithAggregatesFilter;
  NestedFloatFilter: NestedFloatFilter;
  NestedIntFilter: NestedIntFilter;
  NestedIntWithAggregatesFilter: NestedIntWithAggregatesFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringWithAggregatesFilter: NestedStringWithAggregatesFilter;
  OffchainRevocation: OffchainRevocation;
  OffchainRevocationAvgAggregate: OffchainRevocationAvgAggregate;
  OffchainRevocationAvgOrderByAggregateInput: OffchainRevocationAvgOrderByAggregateInput;
  OffchainRevocationCountAggregate: OffchainRevocationCountAggregate;
  OffchainRevocationCountOrderByAggregateInput: OffchainRevocationCountOrderByAggregateInput;
  OffchainRevocationCreateInput: OffchainRevocationCreateInput;
  OffchainRevocationCreateManyInput: OffchainRevocationCreateManyInput;
  OffchainRevocationGroupBy: OffchainRevocationGroupBy;
  OffchainRevocationMaxAggregate: OffchainRevocationMaxAggregate;
  OffchainRevocationMaxOrderByAggregateInput: OffchainRevocationMaxOrderByAggregateInput;
  OffchainRevocationMinAggregate: OffchainRevocationMinAggregate;
  OffchainRevocationMinOrderByAggregateInput: OffchainRevocationMinOrderByAggregateInput;
  OffchainRevocationOrderByWithAggregationInput: OffchainRevocationOrderByWithAggregationInput;
  OffchainRevocationOrderByWithRelationInput: OffchainRevocationOrderByWithRelationInput;
  OffchainRevocationScalarWhereWithAggregatesInput: OffchainRevocationScalarWhereWithAggregatesInput;
  OffchainRevocationSumAggregate: OffchainRevocationSumAggregate;
  OffchainRevocationSumOrderByAggregateInput: OffchainRevocationSumOrderByAggregateInput;
  OffchainRevocationUpdateInput: OffchainRevocationUpdateInput;
  OffchainRevocationUpdateManyMutationInput: OffchainRevocationUpdateManyMutationInput;
  OffchainRevocationWhereInput: OffchainRevocationWhereInput;
  OffchainRevocationWhereUniqueInput: OffchainRevocationWhereUniqueInput;
  Query: {};
  Schema: Schema;
  SchemaAvgAggregate: SchemaAvgAggregate;
  SchemaAvgOrderByAggregateInput: SchemaAvgOrderByAggregateInput;
  SchemaCount: SchemaCount;
  SchemaCountAggregate: SchemaCountAggregate;
  SchemaCountOrderByAggregateInput: SchemaCountOrderByAggregateInput;
  SchemaCreateInput: SchemaCreateInput;
  SchemaCreateManyInput: SchemaCreateManyInput;
  SchemaCreateNestedOneWithoutAttestationsInput: SchemaCreateNestedOneWithoutAttestationsInput;
  SchemaCreateNestedOneWithoutSchemaNamesInput: SchemaCreateNestedOneWithoutSchemaNamesInput;
  SchemaCreateOrConnectWithoutAttestationsInput: SchemaCreateOrConnectWithoutAttestationsInput;
  SchemaCreateOrConnectWithoutSchemaNamesInput: SchemaCreateOrConnectWithoutSchemaNamesInput;
  SchemaCreateWithoutAttestationsInput: SchemaCreateWithoutAttestationsInput;
  SchemaCreateWithoutSchemaNamesInput: SchemaCreateWithoutSchemaNamesInput;
  SchemaGroupBy: SchemaGroupBy;
  SchemaMaxAggregate: SchemaMaxAggregate;
  SchemaMaxOrderByAggregateInput: SchemaMaxOrderByAggregateInput;
  SchemaMinAggregate: SchemaMinAggregate;
  SchemaMinOrderByAggregateInput: SchemaMinOrderByAggregateInput;
  SchemaName: SchemaName;
  SchemaNameAvgAggregate: SchemaNameAvgAggregate;
  SchemaNameAvgOrderByAggregateInput: SchemaNameAvgOrderByAggregateInput;
  SchemaNameCountAggregate: SchemaNameCountAggregate;
  SchemaNameCountOrderByAggregateInput: SchemaNameCountOrderByAggregateInput;
  SchemaNameCreateInput: SchemaNameCreateInput;
  SchemaNameCreateManyInput: SchemaNameCreateManyInput;
  SchemaNameCreateManySchemaInput: SchemaNameCreateManySchemaInput;
  SchemaNameCreateManySchemaInputEnvelope: SchemaNameCreateManySchemaInputEnvelope;
  SchemaNameCreateNestedManyWithoutSchemaInput: SchemaNameCreateNestedManyWithoutSchemaInput;
  SchemaNameCreateOrConnectWithoutSchemaInput: SchemaNameCreateOrConnectWithoutSchemaInput;
  SchemaNameCreateWithoutSchemaInput: SchemaNameCreateWithoutSchemaInput;
  SchemaNameGroupBy: SchemaNameGroupBy;
  SchemaNameListRelationFilter: SchemaNameListRelationFilter;
  SchemaNameMaxAggregate: SchemaNameMaxAggregate;
  SchemaNameMaxOrderByAggregateInput: SchemaNameMaxOrderByAggregateInput;
  SchemaNameMinAggregate: SchemaNameMinAggregate;
  SchemaNameMinOrderByAggregateInput: SchemaNameMinOrderByAggregateInput;
  SchemaNameOrderByRelationAggregateInput: SchemaNameOrderByRelationAggregateInput;
  SchemaNameOrderByWithAggregationInput: SchemaNameOrderByWithAggregationInput;
  SchemaNameOrderByWithRelationInput: SchemaNameOrderByWithRelationInput;
  SchemaNameScalarWhereInput: SchemaNameScalarWhereInput;
  SchemaNameScalarWhereWithAggregatesInput: SchemaNameScalarWhereWithAggregatesInput;
  SchemaNameSumAggregate: SchemaNameSumAggregate;
  SchemaNameSumOrderByAggregateInput: SchemaNameSumOrderByAggregateInput;
  SchemaNameUpdateInput: SchemaNameUpdateInput;
  SchemaNameUpdateManyMutationInput: SchemaNameUpdateManyMutationInput;
  SchemaNameUpdateManyWithWhereWithoutSchemaInput: SchemaNameUpdateManyWithWhereWithoutSchemaInput;
  SchemaNameUpdateManyWithoutSchemaNestedInput: SchemaNameUpdateManyWithoutSchemaNestedInput;
  SchemaNameUpdateWithWhereUniqueWithoutSchemaInput: SchemaNameUpdateWithWhereUniqueWithoutSchemaInput;
  SchemaNameUpdateWithoutSchemaInput: SchemaNameUpdateWithoutSchemaInput;
  SchemaNameUpsertWithWhereUniqueWithoutSchemaInput: SchemaNameUpsertWithWhereUniqueWithoutSchemaInput;
  SchemaNameWhereInput: SchemaNameWhereInput;
  SchemaNameWhereUniqueInput: SchemaNameWhereUniqueInput;
  SchemaOrderByWithAggregationInput: SchemaOrderByWithAggregationInput;
  SchemaOrderByWithRelationInput: SchemaOrderByWithRelationInput;
  SchemaRelationFilter: SchemaRelationFilter;
  SchemaScalarWhereWithAggregatesInput: SchemaScalarWhereWithAggregatesInput;
  SchemaSumAggregate: SchemaSumAggregate;
  SchemaSumOrderByAggregateInput: SchemaSumOrderByAggregateInput;
  SchemaUpdateInput: SchemaUpdateInput;
  SchemaUpdateManyMutationInput: SchemaUpdateManyMutationInput;
  SchemaUpdateOneRequiredWithoutAttestationsNestedInput: SchemaUpdateOneRequiredWithoutAttestationsNestedInput;
  SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput: SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput;
  SchemaUpdateWithoutAttestationsInput: SchemaUpdateWithoutAttestationsInput;
  SchemaUpdateWithoutSchemaNamesInput: SchemaUpdateWithoutSchemaNamesInput;
  SchemaUpsertWithoutAttestationsInput: SchemaUpsertWithoutAttestationsInput;
  SchemaUpsertWithoutSchemaNamesInput: SchemaUpsertWithoutSchemaNamesInput;
  SchemaWhereInput: SchemaWhereInput;
  SchemaWhereUniqueInput: SchemaWhereUniqueInput;
  ServiceStat: ServiceStat;
  ServiceStatCountAggregate: ServiceStatCountAggregate;
  ServiceStatCountOrderByAggregateInput: ServiceStatCountOrderByAggregateInput;
  ServiceStatCreateInput: ServiceStatCreateInput;
  ServiceStatCreateManyInput: ServiceStatCreateManyInput;
  ServiceStatGroupBy: ServiceStatGroupBy;
  ServiceStatMaxAggregate: ServiceStatMaxAggregate;
  ServiceStatMaxOrderByAggregateInput: ServiceStatMaxOrderByAggregateInput;
  ServiceStatMinAggregate: ServiceStatMinAggregate;
  ServiceStatMinOrderByAggregateInput: ServiceStatMinOrderByAggregateInput;
  ServiceStatOrderByWithAggregationInput: ServiceStatOrderByWithAggregationInput;
  ServiceStatOrderByWithRelationInput: ServiceStatOrderByWithRelationInput;
  ServiceStatScalarWhereWithAggregatesInput: ServiceStatScalarWhereWithAggregatesInput;
  ServiceStatUpdateInput: ServiceStatUpdateInput;
  ServiceStatUpdateManyMutationInput: ServiceStatUpdateManyMutationInput;
  ServiceStatWhereInput: ServiceStatWhereInput;
  ServiceStatWhereUniqueInput: ServiceStatWhereUniqueInput;
  String: Scalars['String']['output'];
  StringFieldUpdateOperationsInput: StringFieldUpdateOperationsInput;
  StringFilter: StringFilter;
  StringWithAggregatesFilter: StringWithAggregatesFilter;
  Timestamp: Timestamp;
  TimestampAvgAggregate: TimestampAvgAggregate;
  TimestampAvgOrderByAggregateInput: TimestampAvgOrderByAggregateInput;
  TimestampCountAggregate: TimestampCountAggregate;
  TimestampCountOrderByAggregateInput: TimestampCountOrderByAggregateInput;
  TimestampCreateInput: TimestampCreateInput;
  TimestampCreateManyInput: TimestampCreateManyInput;
  TimestampGroupBy: TimestampGroupBy;
  TimestampMaxAggregate: TimestampMaxAggregate;
  TimestampMaxOrderByAggregateInput: TimestampMaxOrderByAggregateInput;
  TimestampMinAggregate: TimestampMinAggregate;
  TimestampMinOrderByAggregateInput: TimestampMinOrderByAggregateInput;
  TimestampOrderByWithAggregationInput: TimestampOrderByWithAggregationInput;
  TimestampOrderByWithRelationInput: TimestampOrderByWithRelationInput;
  TimestampScalarWhereWithAggregatesInput: TimestampScalarWhereWithAggregatesInput;
  TimestampSumAggregate: TimestampSumAggregate;
  TimestampSumOrderByAggregateInput: TimestampSumOrderByAggregateInput;
  TimestampUpdateInput: TimestampUpdateInput;
  TimestampUpdateManyMutationInput: TimestampUpdateManyMutationInput;
  TimestampWhereInput: TimestampWhereInput;
  TimestampWhereUniqueInput: TimestampWhereUniqueInput;
};

export type AffectedRowsOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AffectedRowsOutput'] = ResolversParentTypes['AffectedRowsOutput']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateAttestationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateAttestation'] = ResolversParentTypes['AggregateAttestation']> = {
  _avg?: Resolver<Maybe<ResolversTypes['AttestationAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['AttestationCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['AttestationMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['AttestationMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['AttestationSumAggregate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateEnsNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateEnsName'] = ResolversParentTypes['AggregateEnsName']> = {
  _avg?: Resolver<Maybe<ResolversTypes['EnsNameAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['EnsNameCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['EnsNameMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['EnsNameMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['EnsNameSumAggregate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateOffchainRevocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateOffchainRevocation'] = ResolversParentTypes['AggregateOffchainRevocation']> = {
  _avg?: Resolver<Maybe<ResolversTypes['OffchainRevocationAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['OffchainRevocationCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['OffchainRevocationMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['OffchainRevocationMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['OffchainRevocationSumAggregate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateSchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateSchema'] = ResolversParentTypes['AggregateSchema']> = {
  _avg?: Resolver<Maybe<ResolversTypes['SchemaAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['SchemaCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['SchemaMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['SchemaMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['SchemaSumAggregate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateSchemaNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateSchemaName'] = ResolversParentTypes['AggregateSchemaName']> = {
  _avg?: Resolver<Maybe<ResolversTypes['SchemaNameAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['SchemaNameCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['SchemaNameMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['SchemaNameMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['SchemaNameSumAggregate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateServiceStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateServiceStat'] = ResolversParentTypes['AggregateServiceStat']> = {
  _count?: Resolver<Maybe<ResolversTypes['ServiceStatCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['ServiceStatMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['ServiceStatMinAggregate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateTimestampResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateTimestamp'] = ResolversParentTypes['AggregateTimestamp']> = {
  _avg?: Resolver<Maybe<ResolversTypes['TimestampAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['TimestampCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['TimestampMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['TimestampMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['TimestampSumAggregate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttestationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attestation'] = ResolversParentTypes['Attestation']> = {
  attester?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  decodedDataJson?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expirationTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ipfsHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isOffchain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refUID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revocable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  revocationTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  revoked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  schema?: Resolver<ResolversTypes['Schema'], ParentType, ContextType>;
  schemaId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttestationAvgAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttestationAvgAggregate'] = ResolversParentTypes['AttestationAvgAggregate']> = {
  expirationTime?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  revocationTime?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timeCreated?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttestationCountAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttestationCountAggregate'] = ResolversParentTypes['AttestationCountAggregate']> = {
  _all?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  attester?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  decodedDataJson?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  expirationTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ipfsHash?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isOffchain?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  refUID?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  revocable?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  revocationTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  revoked?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  schemaId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttestationGroupByResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttestationGroupBy'] = ResolversParentTypes['AttestationGroupBy']> = {
  _avg?: Resolver<Maybe<ResolversTypes['AttestationAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['AttestationCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['AttestationMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['AttestationMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['AttestationSumAggregate']>, ParentType, ContextType>;
  attester?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  decodedDataJson?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expirationTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ipfsHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isOffchain?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refUID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revocable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  revocationTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  revoked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  schemaId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttestationMaxAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttestationMaxAggregate'] = ResolversParentTypes['AttestationMaxAggregate']> = {
  attester?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  decodedDataJson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ipfsHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isOffchain?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refUID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revocable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  revocationTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  revoked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  schemaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timeCreated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttestationMinAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttestationMinAggregate'] = ResolversParentTypes['AttestationMinAggregate']> = {
  attester?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  decodedDataJson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ipfsHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isOffchain?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refUID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revocable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  revocationTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  revoked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  schemaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timeCreated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttestationSumAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttestationSumAggregate'] = ResolversParentTypes['AttestationSumAggregate']> = {
  expirationTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  revocationTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timeCreated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnsNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnsName'] = ResolversParentTypes['EnsName']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnsNameAvgAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnsNameAvgAggregate'] = ResolversParentTypes['EnsNameAvgAggregate']> = {
  timestamp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnsNameCountAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnsNameCountAggregate'] = ResolversParentTypes['EnsNameCountAggregate']> = {
  _all?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnsNameGroupByResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnsNameGroupBy'] = ResolversParentTypes['EnsNameGroupBy']> = {
  _avg?: Resolver<Maybe<ResolversTypes['EnsNameAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['EnsNameCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['EnsNameMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['EnsNameMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['EnsNameSumAggregate']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnsNameMaxAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnsNameMaxAggregate'] = ResolversParentTypes['EnsNameMaxAggregate']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnsNameMinAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnsNameMinAggregate'] = ResolversParentTypes['EnsNameMinAggregate']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnsNameSumAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnsNameSumAggregate'] = ResolversParentTypes['EnsNameSumAggregate']> = {
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createManyAttestation?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationCreateManyAttestationArgs, 'data'>>;
  createManyEnsName?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationCreateManyEnsNameArgs, 'data'>>;
  createManyOffchainRevocation?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationCreateManyOffchainRevocationArgs, 'data'>>;
  createManySchema?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationCreateManySchemaArgs, 'data'>>;
  createManySchemaName?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationCreateManySchemaNameArgs, 'data'>>;
  createManyServiceStat?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationCreateManyServiceStatArgs, 'data'>>;
  createManyTimestamp?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationCreateManyTimestampArgs, 'data'>>;
  createOneAttestation?: Resolver<ResolversTypes['Attestation'], ParentType, ContextType, RequireFields<MutationCreateOneAttestationArgs, 'data'>>;
  createOneEnsName?: Resolver<ResolversTypes['EnsName'], ParentType, ContextType, RequireFields<MutationCreateOneEnsNameArgs, 'data'>>;
  createOneOffchainRevocation?: Resolver<ResolversTypes['OffchainRevocation'], ParentType, ContextType, RequireFields<MutationCreateOneOffchainRevocationArgs, 'data'>>;
  createOneSchema?: Resolver<ResolversTypes['Schema'], ParentType, ContextType, RequireFields<MutationCreateOneSchemaArgs, 'data'>>;
  createOneSchemaName?: Resolver<ResolversTypes['SchemaName'], ParentType, ContextType, RequireFields<MutationCreateOneSchemaNameArgs, 'data'>>;
  createOneServiceStat?: Resolver<ResolversTypes['ServiceStat'], ParentType, ContextType, RequireFields<MutationCreateOneServiceStatArgs, 'data'>>;
  createOneTimestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationCreateOneTimestampArgs, 'data'>>;
  deleteManyAttestation?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, Partial<MutationDeleteManyAttestationArgs>>;
  deleteManyEnsName?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, Partial<MutationDeleteManyEnsNameArgs>>;
  deleteManyOffchainRevocation?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, Partial<MutationDeleteManyOffchainRevocationArgs>>;
  deleteManySchema?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, Partial<MutationDeleteManySchemaArgs>>;
  deleteManySchemaName?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, Partial<MutationDeleteManySchemaNameArgs>>;
  deleteManyServiceStat?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, Partial<MutationDeleteManyServiceStatArgs>>;
  deleteManyTimestamp?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, Partial<MutationDeleteManyTimestampArgs>>;
  deleteOneAttestation?: Resolver<Maybe<ResolversTypes['Attestation']>, ParentType, ContextType, RequireFields<MutationDeleteOneAttestationArgs, 'where'>>;
  deleteOneEnsName?: Resolver<Maybe<ResolversTypes['EnsName']>, ParentType, ContextType, RequireFields<MutationDeleteOneEnsNameArgs, 'where'>>;
  deleteOneOffchainRevocation?: Resolver<Maybe<ResolversTypes['OffchainRevocation']>, ParentType, ContextType, RequireFields<MutationDeleteOneOffchainRevocationArgs, 'where'>>;
  deleteOneSchema?: Resolver<Maybe<ResolversTypes['Schema']>, ParentType, ContextType, RequireFields<MutationDeleteOneSchemaArgs, 'where'>>;
  deleteOneSchemaName?: Resolver<Maybe<ResolversTypes['SchemaName']>, ParentType, ContextType, RequireFields<MutationDeleteOneSchemaNameArgs, 'where'>>;
  deleteOneServiceStat?: Resolver<Maybe<ResolversTypes['ServiceStat']>, ParentType, ContextType, RequireFields<MutationDeleteOneServiceStatArgs, 'where'>>;
  deleteOneTimestamp?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType, RequireFields<MutationDeleteOneTimestampArgs, 'where'>>;
  updateManyAttestation?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationUpdateManyAttestationArgs, 'data'>>;
  updateManyEnsName?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationUpdateManyEnsNameArgs, 'data'>>;
  updateManyOffchainRevocation?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationUpdateManyOffchainRevocationArgs, 'data'>>;
  updateManySchema?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationUpdateManySchemaArgs, 'data'>>;
  updateManySchemaName?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationUpdateManySchemaNameArgs, 'data'>>;
  updateManyServiceStat?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationUpdateManyServiceStatArgs, 'data'>>;
  updateManyTimestamp?: Resolver<ResolversTypes['AffectedRowsOutput'], ParentType, ContextType, RequireFields<MutationUpdateManyTimestampArgs, 'data'>>;
  updateOneAttestation?: Resolver<Maybe<ResolversTypes['Attestation']>, ParentType, ContextType, RequireFields<MutationUpdateOneAttestationArgs, 'data' | 'where'>>;
  updateOneEnsName?: Resolver<Maybe<ResolversTypes['EnsName']>, ParentType, ContextType, RequireFields<MutationUpdateOneEnsNameArgs, 'data' | 'where'>>;
  updateOneOffchainRevocation?: Resolver<Maybe<ResolversTypes['OffchainRevocation']>, ParentType, ContextType, RequireFields<MutationUpdateOneOffchainRevocationArgs, 'data' | 'where'>>;
  updateOneSchema?: Resolver<Maybe<ResolversTypes['Schema']>, ParentType, ContextType, RequireFields<MutationUpdateOneSchemaArgs, 'data' | 'where'>>;
  updateOneSchemaName?: Resolver<Maybe<ResolversTypes['SchemaName']>, ParentType, ContextType, RequireFields<MutationUpdateOneSchemaNameArgs, 'data' | 'where'>>;
  updateOneServiceStat?: Resolver<Maybe<ResolversTypes['ServiceStat']>, ParentType, ContextType, RequireFields<MutationUpdateOneServiceStatArgs, 'data' | 'where'>>;
  updateOneTimestamp?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType, RequireFields<MutationUpdateOneTimestampArgs, 'data' | 'where'>>;
  upsertOneAttestation?: Resolver<ResolversTypes['Attestation'], ParentType, ContextType, RequireFields<MutationUpsertOneAttestationArgs, 'create' | 'update' | 'where'>>;
  upsertOneEnsName?: Resolver<ResolversTypes['EnsName'], ParentType, ContextType, RequireFields<MutationUpsertOneEnsNameArgs, 'create' | 'update' | 'where'>>;
  upsertOneOffchainRevocation?: Resolver<ResolversTypes['OffchainRevocation'], ParentType, ContextType, RequireFields<MutationUpsertOneOffchainRevocationArgs, 'create' | 'update' | 'where'>>;
  upsertOneSchema?: Resolver<ResolversTypes['Schema'], ParentType, ContextType, RequireFields<MutationUpsertOneSchemaArgs, 'create' | 'update' | 'where'>>;
  upsertOneSchemaName?: Resolver<ResolversTypes['SchemaName'], ParentType, ContextType, RequireFields<MutationUpsertOneSchemaNameArgs, 'create' | 'update' | 'where'>>;
  upsertOneServiceStat?: Resolver<ResolversTypes['ServiceStat'], ParentType, ContextType, RequireFields<MutationUpsertOneServiceStatArgs, 'create' | 'update' | 'where'>>;
  upsertOneTimestamp?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType, RequireFields<MutationUpsertOneTimestampArgs, 'create' | 'update' | 'where'>>;
};

export type OffchainRevocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffchainRevocation'] = ResolversParentTypes['OffchainRevocation']> = {
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OffchainRevocationAvgAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffchainRevocationAvgAggregate'] = ResolversParentTypes['OffchainRevocationAvgAggregate']> = {
  timestamp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OffchainRevocationCountAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffchainRevocationCountAggregate'] = ResolversParentTypes['OffchainRevocationCountAggregate']> = {
  _all?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OffchainRevocationGroupByResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffchainRevocationGroupBy'] = ResolversParentTypes['OffchainRevocationGroupBy']> = {
  _avg?: Resolver<Maybe<ResolversTypes['OffchainRevocationAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['OffchainRevocationCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['OffchainRevocationMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['OffchainRevocationMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['OffchainRevocationSumAggregate']>, ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OffchainRevocationMaxAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffchainRevocationMaxAggregate'] = ResolversParentTypes['OffchainRevocationMaxAggregate']> = {
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OffchainRevocationMinAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffchainRevocationMinAggregate'] = ResolversParentTypes['OffchainRevocationMinAggregate']> = {
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OffchainRevocationSumAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffchainRevocationSumAggregate'] = ResolversParentTypes['OffchainRevocationSumAggregate']> = {
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  aggregateAttestation?: Resolver<ResolversTypes['AggregateAttestation'], ParentType, ContextType, Partial<QueryAggregateAttestationArgs>>;
  aggregateEnsName?: Resolver<ResolversTypes['AggregateEnsName'], ParentType, ContextType, Partial<QueryAggregateEnsNameArgs>>;
  aggregateOffchainRevocation?: Resolver<ResolversTypes['AggregateOffchainRevocation'], ParentType, ContextType, Partial<QueryAggregateOffchainRevocationArgs>>;
  aggregateSchema?: Resolver<ResolversTypes['AggregateSchema'], ParentType, ContextType, Partial<QueryAggregateSchemaArgs>>;
  aggregateSchemaName?: Resolver<ResolversTypes['AggregateSchemaName'], ParentType, ContextType, Partial<QueryAggregateSchemaNameArgs>>;
  aggregateServiceStat?: Resolver<ResolversTypes['AggregateServiceStat'], ParentType, ContextType, Partial<QueryAggregateServiceStatArgs>>;
  aggregateTimestamp?: Resolver<ResolversTypes['AggregateTimestamp'], ParentType, ContextType, Partial<QueryAggregateTimestampArgs>>;
  attestation?: Resolver<Maybe<ResolversTypes['Attestation']>, ParentType, ContextType, RequireFields<QueryAttestationArgs, 'where'>>;
  attestations?: Resolver<Array<ResolversTypes['Attestation']>, ParentType, ContextType, Partial<QueryAttestationsArgs>>;
  ensName?: Resolver<Maybe<ResolversTypes['EnsName']>, ParentType, ContextType, RequireFields<QueryEnsNameArgs, 'where'>>;
  ensNames?: Resolver<Array<ResolversTypes['EnsName']>, ParentType, ContextType, Partial<QueryEnsNamesArgs>>;
  findFirstAttestation?: Resolver<Maybe<ResolversTypes['Attestation']>, ParentType, ContextType, Partial<QueryFindFirstAttestationArgs>>;
  findFirstAttestationOrThrow?: Resolver<Maybe<ResolversTypes['Attestation']>, ParentType, ContextType, Partial<QueryFindFirstAttestationOrThrowArgs>>;
  findFirstEnsName?: Resolver<Maybe<ResolversTypes['EnsName']>, ParentType, ContextType, Partial<QueryFindFirstEnsNameArgs>>;
  findFirstEnsNameOrThrow?: Resolver<Maybe<ResolversTypes['EnsName']>, ParentType, ContextType, Partial<QueryFindFirstEnsNameOrThrowArgs>>;
  findFirstOffchainRevocation?: Resolver<Maybe<ResolversTypes['OffchainRevocation']>, ParentType, ContextType, Partial<QueryFindFirstOffchainRevocationArgs>>;
  findFirstOffchainRevocationOrThrow?: Resolver<Maybe<ResolversTypes['OffchainRevocation']>, ParentType, ContextType, Partial<QueryFindFirstOffchainRevocationOrThrowArgs>>;
  findFirstSchema?: Resolver<Maybe<ResolversTypes['Schema']>, ParentType, ContextType, Partial<QueryFindFirstSchemaArgs>>;
  findFirstSchemaName?: Resolver<Maybe<ResolversTypes['SchemaName']>, ParentType, ContextType, Partial<QueryFindFirstSchemaNameArgs>>;
  findFirstSchemaNameOrThrow?: Resolver<Maybe<ResolversTypes['SchemaName']>, ParentType, ContextType, Partial<QueryFindFirstSchemaNameOrThrowArgs>>;
  findFirstSchemaOrThrow?: Resolver<Maybe<ResolversTypes['Schema']>, ParentType, ContextType, Partial<QueryFindFirstSchemaOrThrowArgs>>;
  findFirstServiceStat?: Resolver<Maybe<ResolversTypes['ServiceStat']>, ParentType, ContextType, Partial<QueryFindFirstServiceStatArgs>>;
  findFirstServiceStatOrThrow?: Resolver<Maybe<ResolversTypes['ServiceStat']>, ParentType, ContextType, Partial<QueryFindFirstServiceStatOrThrowArgs>>;
  findFirstTimestamp?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType, Partial<QueryFindFirstTimestampArgs>>;
  findFirstTimestampOrThrow?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType, Partial<QueryFindFirstTimestampOrThrowArgs>>;
  getAttestation?: Resolver<Maybe<ResolversTypes['Attestation']>, ParentType, ContextType, RequireFields<QueryGetAttestationArgs, 'where'>>;
  getEnsName?: Resolver<Maybe<ResolversTypes['EnsName']>, ParentType, ContextType, RequireFields<QueryGetEnsNameArgs, 'where'>>;
  getOffchainRevocation?: Resolver<Maybe<ResolversTypes['OffchainRevocation']>, ParentType, ContextType, RequireFields<QueryGetOffchainRevocationArgs, 'where'>>;
  getSchema?: Resolver<Maybe<ResolversTypes['Schema']>, ParentType, ContextType, RequireFields<QueryGetSchemaArgs, 'where'>>;
  getSchemaName?: Resolver<Maybe<ResolversTypes['SchemaName']>, ParentType, ContextType, RequireFields<QueryGetSchemaNameArgs, 'where'>>;
  getServiceStat?: Resolver<Maybe<ResolversTypes['ServiceStat']>, ParentType, ContextType, RequireFields<QueryGetServiceStatArgs, 'where'>>;
  getTimestamp?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType, RequireFields<QueryGetTimestampArgs, 'where'>>;
  groupByAttestation?: Resolver<Array<ResolversTypes['AttestationGroupBy']>, ParentType, ContextType, RequireFields<QueryGroupByAttestationArgs, 'by'>>;
  groupByEnsName?: Resolver<Array<ResolversTypes['EnsNameGroupBy']>, ParentType, ContextType, RequireFields<QueryGroupByEnsNameArgs, 'by'>>;
  groupByOffchainRevocation?: Resolver<Array<ResolversTypes['OffchainRevocationGroupBy']>, ParentType, ContextType, RequireFields<QueryGroupByOffchainRevocationArgs, 'by'>>;
  groupBySchema?: Resolver<Array<ResolversTypes['SchemaGroupBy']>, ParentType, ContextType, RequireFields<QueryGroupBySchemaArgs, 'by'>>;
  groupBySchemaName?: Resolver<Array<ResolversTypes['SchemaNameGroupBy']>, ParentType, ContextType, RequireFields<QueryGroupBySchemaNameArgs, 'by'>>;
  groupByServiceStat?: Resolver<Array<ResolversTypes['ServiceStatGroupBy']>, ParentType, ContextType, RequireFields<QueryGroupByServiceStatArgs, 'by'>>;
  groupByTimestamp?: Resolver<Array<ResolversTypes['TimestampGroupBy']>, ParentType, ContextType, RequireFields<QueryGroupByTimestampArgs, 'by'>>;
  offchainRevocation?: Resolver<Maybe<ResolversTypes['OffchainRevocation']>, ParentType, ContextType, RequireFields<QueryOffchainRevocationArgs, 'where'>>;
  offchainRevocations?: Resolver<Array<ResolversTypes['OffchainRevocation']>, ParentType, ContextType, Partial<QueryOffchainRevocationsArgs>>;
  schema?: Resolver<Maybe<ResolversTypes['Schema']>, ParentType, ContextType, RequireFields<QuerySchemaArgs, 'where'>>;
  schemaName?: Resolver<Maybe<ResolversTypes['SchemaName']>, ParentType, ContextType, RequireFields<QuerySchemaNameArgs, 'where'>>;
  schemaNames?: Resolver<Array<ResolversTypes['SchemaName']>, ParentType, ContextType, Partial<QuerySchemaNamesArgs>>;
  schemata?: Resolver<Array<ResolversTypes['Schema']>, ParentType, ContextType, Partial<QuerySchemataArgs>>;
  serviceStat?: Resolver<Maybe<ResolversTypes['ServiceStat']>, ParentType, ContextType, RequireFields<QueryServiceStatArgs, 'where'>>;
  serviceStats?: Resolver<Array<ResolversTypes['ServiceStat']>, ParentType, ContextType, Partial<QueryServiceStatsArgs>>;
  timestamp?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType, RequireFields<QueryTimestampArgs, 'where'>>;
  timestamps?: Resolver<Array<ResolversTypes['Timestamp']>, ParentType, ContextType, Partial<QueryTimestampsArgs>>;
};

export type SchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Schema'] = ResolversParentTypes['Schema']> = {
  _count?: Resolver<Maybe<ResolversTypes['SchemaCount']>, ParentType, ContextType>;
  attestations?: Resolver<Array<ResolversTypes['Attestation']>, ParentType, ContextType, Partial<SchemaAttestationsArgs>>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resolver?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revocable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  schema?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schemaNames?: Resolver<Array<ResolversTypes['SchemaName']>, ParentType, ContextType, Partial<SchemaSchemaNamesArgs>>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaAvgAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaAvgAggregate'] = ResolversParentTypes['SchemaAvgAggregate']> = {
  time?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaCount'] = ResolversParentTypes['SchemaCount']> = {
  attestations?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  schemaNames?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaCountAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaCountAggregate'] = ResolversParentTypes['SchemaCountAggregate']> = {
  _all?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolver?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  revocable?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  schema?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaGroupByResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaGroupBy'] = ResolversParentTypes['SchemaGroupBy']> = {
  _avg?: Resolver<Maybe<ResolversTypes['SchemaAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['SchemaCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['SchemaMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['SchemaMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['SchemaSumAggregate']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resolver?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revocable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  schema?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaMaxAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaMaxAggregate'] = ResolversParentTypes['SchemaMaxAggregate']> = {
  creator?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolver?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revocable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  schema?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaMinAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaMinAggregate'] = ResolversParentTypes['SchemaMinAggregate']> = {
  creator?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolver?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revocable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  schema?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaName'] = ResolversParentTypes['SchemaName']> = {
  attesterAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isCreator?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schema?: Resolver<ResolversTypes['Schema'], ParentType, ContextType>;
  schemaId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaNameAvgAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaNameAvgAggregate'] = ResolversParentTypes['SchemaNameAvgAggregate']> = {
  time?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaNameCountAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaNameCountAggregate'] = ResolversParentTypes['SchemaNameCountAggregate']> = {
  _all?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  attesterAddress?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isCreator?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  schemaId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaNameGroupByResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaNameGroupBy'] = ResolversParentTypes['SchemaNameGroupBy']> = {
  _avg?: Resolver<Maybe<ResolversTypes['SchemaNameAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['SchemaNameCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['SchemaNameMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['SchemaNameMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['SchemaNameSumAggregate']>, ParentType, ContextType>;
  attesterAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isCreator?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schemaId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaNameMaxAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaNameMaxAggregate'] = ResolversParentTypes['SchemaNameMaxAggregate']> = {
  attesterAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCreator?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  schemaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaNameMinAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaNameMinAggregate'] = ResolversParentTypes['SchemaNameMinAggregate']> = {
  attesterAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCreator?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  schemaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaNameSumAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaNameSumAggregate'] = ResolversParentTypes['SchemaNameSumAggregate']> = {
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaSumAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['SchemaSumAggregate'] = ResolversParentTypes['SchemaSumAggregate']> = {
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['ServiceStat'] = ResolversParentTypes['ServiceStat']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceStatCountAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ServiceStatCountAggregate'] = ResolversParentTypes['ServiceStatCountAggregate']> = {
  _all?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceStatGroupByResolvers<ContextType = any, ParentType extends ResolversParentTypes['ServiceStatGroupBy'] = ResolversParentTypes['ServiceStatGroupBy']> = {
  _count?: Resolver<Maybe<ResolversTypes['ServiceStatCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['ServiceStatMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['ServiceStatMinAggregate']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceStatMaxAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ServiceStatMaxAggregate'] = ResolversParentTypes['ServiceStatMaxAggregate']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceStatMinAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ServiceStatMinAggregate'] = ResolversParentTypes['ServiceStatMinAggregate']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timestamp'] = ResolversParentTypes['Timestamp']> = {
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tree?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampAvgAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimestampAvgAggregate'] = ResolversParentTypes['TimestampAvgAggregate']> = {
  timestamp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampCountAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimestampCountAggregate'] = ResolversParentTypes['TimestampCountAggregate']> = {
  _all?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tree?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampGroupByResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimestampGroupBy'] = ResolversParentTypes['TimestampGroupBy']> = {
  _avg?: Resolver<Maybe<ResolversTypes['TimestampAvgAggregate']>, ParentType, ContextType>;
  _count?: Resolver<Maybe<ResolversTypes['TimestampCountAggregate']>, ParentType, ContextType>;
  _max?: Resolver<Maybe<ResolversTypes['TimestampMaxAggregate']>, ParentType, ContextType>;
  _min?: Resolver<Maybe<ResolversTypes['TimestampMinAggregate']>, ParentType, ContextType>;
  _sum?: Resolver<Maybe<ResolversTypes['TimestampSumAggregate']>, ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tree?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  txid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampMaxAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimestampMaxAggregate'] = ResolversParentTypes['TimestampMaxAggregate']> = {
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tree?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampMinAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimestampMinAggregate'] = ResolversParentTypes['TimestampMinAggregate']> = {
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tree?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimestampSumAggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimestampSumAggregate'] = ResolversParentTypes['TimestampSumAggregate']> = {
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AffectedRowsOutput?: AffectedRowsOutputResolvers<ContextType>;
  AggregateAttestation?: AggregateAttestationResolvers<ContextType>;
  AggregateEnsName?: AggregateEnsNameResolvers<ContextType>;
  AggregateOffchainRevocation?: AggregateOffchainRevocationResolvers<ContextType>;
  AggregateSchema?: AggregateSchemaResolvers<ContextType>;
  AggregateSchemaName?: AggregateSchemaNameResolvers<ContextType>;
  AggregateServiceStat?: AggregateServiceStatResolvers<ContextType>;
  AggregateTimestamp?: AggregateTimestampResolvers<ContextType>;
  Attestation?: AttestationResolvers<ContextType>;
  AttestationAvgAggregate?: AttestationAvgAggregateResolvers<ContextType>;
  AttestationCountAggregate?: AttestationCountAggregateResolvers<ContextType>;
  AttestationGroupBy?: AttestationGroupByResolvers<ContextType>;
  AttestationMaxAggregate?: AttestationMaxAggregateResolvers<ContextType>;
  AttestationMinAggregate?: AttestationMinAggregateResolvers<ContextType>;
  AttestationSumAggregate?: AttestationSumAggregateResolvers<ContextType>;
  EnsName?: EnsNameResolvers<ContextType>;
  EnsNameAvgAggregate?: EnsNameAvgAggregateResolvers<ContextType>;
  EnsNameCountAggregate?: EnsNameCountAggregateResolvers<ContextType>;
  EnsNameGroupBy?: EnsNameGroupByResolvers<ContextType>;
  EnsNameMaxAggregate?: EnsNameMaxAggregateResolvers<ContextType>;
  EnsNameMinAggregate?: EnsNameMinAggregateResolvers<ContextType>;
  EnsNameSumAggregate?: EnsNameSumAggregateResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OffchainRevocation?: OffchainRevocationResolvers<ContextType>;
  OffchainRevocationAvgAggregate?: OffchainRevocationAvgAggregateResolvers<ContextType>;
  OffchainRevocationCountAggregate?: OffchainRevocationCountAggregateResolvers<ContextType>;
  OffchainRevocationGroupBy?: OffchainRevocationGroupByResolvers<ContextType>;
  OffchainRevocationMaxAggregate?: OffchainRevocationMaxAggregateResolvers<ContextType>;
  OffchainRevocationMinAggregate?: OffchainRevocationMinAggregateResolvers<ContextType>;
  OffchainRevocationSumAggregate?: OffchainRevocationSumAggregateResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Schema?: SchemaResolvers<ContextType>;
  SchemaAvgAggregate?: SchemaAvgAggregateResolvers<ContextType>;
  SchemaCount?: SchemaCountResolvers<ContextType>;
  SchemaCountAggregate?: SchemaCountAggregateResolvers<ContextType>;
  SchemaGroupBy?: SchemaGroupByResolvers<ContextType>;
  SchemaMaxAggregate?: SchemaMaxAggregateResolvers<ContextType>;
  SchemaMinAggregate?: SchemaMinAggregateResolvers<ContextType>;
  SchemaName?: SchemaNameResolvers<ContextType>;
  SchemaNameAvgAggregate?: SchemaNameAvgAggregateResolvers<ContextType>;
  SchemaNameCountAggregate?: SchemaNameCountAggregateResolvers<ContextType>;
  SchemaNameGroupBy?: SchemaNameGroupByResolvers<ContextType>;
  SchemaNameMaxAggregate?: SchemaNameMaxAggregateResolvers<ContextType>;
  SchemaNameMinAggregate?: SchemaNameMinAggregateResolvers<ContextType>;
  SchemaNameSumAggregate?: SchemaNameSumAggregateResolvers<ContextType>;
  SchemaSumAggregate?: SchemaSumAggregateResolvers<ContextType>;
  ServiceStat?: ServiceStatResolvers<ContextType>;
  ServiceStatCountAggregate?: ServiceStatCountAggregateResolvers<ContextType>;
  ServiceStatGroupBy?: ServiceStatGroupByResolvers<ContextType>;
  ServiceStatMaxAggregate?: ServiceStatMaxAggregateResolvers<ContextType>;
  ServiceStatMinAggregate?: ServiceStatMinAggregateResolvers<ContextType>;
  Timestamp?: TimestampResolvers<ContextType>;
  TimestampAvgAggregate?: TimestampAvgAggregateResolvers<ContextType>;
  TimestampCountAggregate?: TimestampCountAggregateResolvers<ContextType>;
  TimestampGroupBy?: TimestampGroupByResolvers<ContextType>;
  TimestampMaxAggregate?: TimestampMaxAggregateResolvers<ContextType>;
  TimestampMinAggregate?: TimestampMinAggregateResolvers<ContextType>;
  TimestampSumAggregate?: TimestampSumAggregateResolvers<ContextType>;
};

