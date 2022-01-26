import {
    IChannelItem,
    IConfigurationData,
    IConfigurationSessionData,
    IDocumentItem,
    IDocumentLatestVersion,
    IDocumentPath,
    IFavoriteItem,
    IRecentLinkItem,
} from '../utils/types';

export function convertToFavoriteData(rawData: any): IFavoriteItem {
    return {
        id: rawData.id,
        index: rawData.index,
        itemId: rawData.itemId,
        itemStatus: rawData.itemStatus,
        itemName: rawData.itemName,
        itemClass: rawData.itemClass,
        itemUpdated: rawData.itemUpdated,
        itemCreated: rawData.itemCreated,
        itemFormat: rawData.itemFormat,
        itemResource: rawData.itemResource,
    };
}

export function convertToDocumentData(rawData: any): IDocumentItem {
    let latestVersion: IDocumentLatestVersion | null = null;
    if (rawData.latestVersion) {
        latestVersion = {
            dateCreated: rawData.latestVersion.dateCreated,
            languages: rawData.latestVersion.languages,
            id: rawData.latestVersion.id,
            previewId: rawData.latestVersion.previewId,
            name: rawData.latestVersion.name,
            fileId: rawData.latestVersion.fileId,
            class: rawData.latestVersion.class,
            resourceType: rawData.latestVersion.resourceType,
            guid: rawData.latestVersion.guid,
            format: rawData.latestVersion.format,
        };
    }
    return {
        id: rawData.id,
        name: rawData.name,
        path: rawData.path,
        resourceType: rawData.resourceType,
        class: rawData.class,
        format: rawData.format,
        dateUpdated: rawData.dateUpdated,
        dateCreated: rawData.dateCreated,
        isFavorite: rawData.isFavorite,
        description: rawData.description,
        accessLevel: rawData.accessLevel,
        spaceId: rawData.spaceId,
        folderId: rawData.folderId,
        guid: rawData.guid,
        numberOfDocuments: rawData.numberOfDocuments,
        parentId: rawData.parentId,
        numberOfSubfolders: rawData.numberOfSubfolders,
        nesting: rawData.nesting,
        whitelistExempt: rawData.whitelistExempt,
        numberOfSharedLinks: rawData.numberOfSharedLinks,
        service: rawData.service,
        latestVersion,
    };
}

export function convertToDocumentPath(rawData: any): IDocumentPath {
    return {
        id: rawData.id,
        name: rawData.name,
        class: rawData.class,
        dateUpdated: rawData.dateUpdated,
        dateCreated: rawData.dateCreated,
        isFavorite: rawData.isFavorite,
        description: rawData.description,
        accessLevel: rawData.accessLevel,
        numberOfDocuments: rawData.numberOfDocuments,
        parentId: rawData.parentId,
        numberOfSubfolders: rawData.numberOfSubfolders,
        nesting: rawData.nesting,
        whitelistExempt: rawData.whitelistExempt,
        path: rawData.path,
    };
}

export function convertToRecentLinkData(rawData: any): IRecentLinkItem {
    return {
        id: rawData.id,
        documentResource: rawData.documentResource,
        class: rawData.class,
        documentName: rawData.documentName,
        documentFormat: rawData.documentFormat,
        documentUpdated: rawData.documentUpdated,
        documentCreated: rawData.documentCreated,
    };
}

export function convertToChannelData(rawData: any): IChannelItem {
    return {
        id: rawData.id,
        name: rawData.name,
        description: rawData.description,
        pictureId: rawData.pictureId,
    };
}

export function convertToConfigurationData(rawData: any): IConfigurationData {
    let sessionData: IConfigurationSessionData | null = null;
    if (rawData.sessionData) {
        sessionData = {
            userFirstName: rawData.sessionData.userFirstName,
            userLastName: rawData.sessionData.userLastName,
            userEmail: rawData.sessionData.userEmail,
            username: rawData.sessionData.username,
            userId: rawData.sessionData.userId,
            tenantId: rawData.sessionData.tenantId,
        };
    }
    return {
        authCookieName: rawData.authCookieName,
        authCookieDomain: rawData.authCookieDomain,
        directCoreBaseUrl: rawData.directCoreBaseUrl,
        coreBaseUrl: rawData.coreBaseUrl,
        lrsStatementsUrl: rawData.lrsStatementsUrl,
        lrsAgentsUrl: rawData.lrsAgentsUrl,
        webPortalUrl: rawData.webPortalUrl,
        localAccounts: rawData.localAccounts,
        restPattern: rawData.restPattern,
        rootFolderName: rawData.rootFolderName,
        rootGroupName: rawData.rootGroupName,
        releaseNotesUrl: rawData.releaseNotesUrl,
        maxUploadFileSize: rawData.maxUploadFileSize,
        maxSyncUploadFileSize: rawData.maxSyncUploadFileSize,
        logoutPath: rawData.logoutPath,
        appVersion: rawData.appVersion,
        ui: rawData.ui,
        uiPath: rawData.uiPath,
        enableThinPackageIframe: rawData.enableThinPackageIframe,
        logRocketChannel: rawData.logRocketChannel,
        dictionary: rawData.dictionary,
        lrsPath: rawData.lrsPath,
        sessionData,
    };
}
