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
    uploadToFilestack: (file, apiHandler) => {
        return new Promise();
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
        // apiHandler.upload();
        // console.log('ctx', ctx);
    }
};

// mutations
const mutations = {
    addFile: (state, file) => {
        console.log(file);
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
            fileHandler: file.blob
        });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
