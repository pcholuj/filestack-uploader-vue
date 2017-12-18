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
    }
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
            const promiseUpload = new Promise((resolve) => {
                apiHandler.upload(file.fileHandler, {
                    onProgress: (ev) => {
                        ctx.commit('updateUploadProgress', { file, ev });
                    },
                    onRetry: (ev) => {
                        ctx.commit('updateUploadProgress', { file, ev });
                    }
                }, {
                    filename: file.name
                }).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    ctx.commit('markAsFailed', file);
                    resolve(err);
                });
            });

            uploadQueue.push(promiseUpload);
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
            uploadStartTime: null,
            mimetype: file.mimetype,
            size: file.size,
            progress: 0,
            uploadSpeed: 0,
            uploadError: false,
            fileHandler: file.raw
        });
    },
    updateUploadProgress: (state, data) => {
        const index = state.files.indexOf(data.file);

        if (data.ev.totalBytes === 0) {
            state.files[index].uploadStartTime = Date.now();
            state.files[index].uploadSpeed = 0;
            state.files[index].progress = 0;
        } else {
            const uploadDuration = (Date.now() - state.files[index].uploadStartTime) / 1000;
            state.files[index].uploadSpeed = Math.round(data.ev.totalBytes / uploadDuration / 1024);
            state.files[index].progress = data.ev.totalPercent;
        }
    },
    markAsFailed: (state, file) => {
        const index = state.files.indexOf(file);
        state.files[index].uploadError = true;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};
