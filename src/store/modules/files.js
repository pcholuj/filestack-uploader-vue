// initial state
const state = {
    files: [
    ]
};

// getters
const getters = {

};

const helpers = {
    IMAGE_MIMETYPES: [],
    readFile: (file) => {
        return new Promise((resolve, reject) => {
            let fr = new FileReader();

            fr.onloadend = (e) => {
                const blob = new Blob([fr.result], { type: file.type });
                const isImage = /image/.test(file.type);

                resolve({
                    size: blob.size,
                    name: file.name,
                    mimetype: file.type,
                    isImage: isImage,
                    raw: blob,
                    preview: isImage ? URL.createObjectURL(blob) : null,
                    arrayBuffer: fr.result,
                });
            };

            fr.onerror = (e) => {
                reject(e);
            };

            fr.readAsArrayBuffer(file);
        });
    },
    uploadStartTime: null
};

// actions
const actions = {
    loadFiles: (ctx, files) => {
        let promises = [];

        for (let file of files) {
            promises.push(helpers.readFile(file));
        }

        return Promise.all(promises).then((files) => {
            files.forEach((file) => {
                ctx.commit('addFile', file);
            });
        });
    },
    upload: (ctx) => {
        const apiHandler = ctx.rootState.apiHandler;
        const files = ctx.state.files;

        let uploadQueue = [];

        files.forEach((file) => {
            helpers.uploadStartTime = Date.now();

            uploadQueue.push(apiHandler.upload(file.fileHandler, {
                onProgress: (ev) => {
                    ctx.commit('updateUploadProgress', { file, ev });
                }
            }));
        });

        return Promise.all(uploadQueue);
    }
};

// mutations
const mutations = {
    addFile: (state, file) => {
        state.files.push({
            id: null,
            name: file.name,
            extension: file.name.split('.').pop(),
            preview: file.preview,
            mimetype: file.mimetype,
            size: file.size,
            progress: null,
            uploadSpeed: null,
            isUploaded: false,
            fileHandler: file.raw
        });
    },
    updateUploadProgress: (state, data) => {
        const index = state.files.indexOf(data.file);

        const uploadDuration = (Date.now() - helpers.uploadStartTime) / 1000;
        state.files[index].uploadSpeed = Math.round(data.ev.totalBytes / uploadDuration / 1024);
        state.files[index].progress = data.ev.totalPercent;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
