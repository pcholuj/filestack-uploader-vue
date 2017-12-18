import { mapState, mapGetters } from 'vuex';
import Thumbnail from './components/thumbnail/thumbnail.vue';

export default {
    name: 'FilesList',
    data() {
        return {
            isUploading: null,
            filesLoaded: null
        };
    },
    components: {
        'thumbnail': Thumbnail
    },
    computed: {
        ...mapGetters([
            'isApiInitialized'
        ]),
        ...mapState({
            files: ({ files }) => files.files
        })
    },
    methods: {
        load: function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (!e.target.files) {
                return false;
            }

            this.$store.dispatch('loadFiles', e.target.files).then(() => {
                this.filesLoaded = true;
                this.$toasted.success('Files has been loaded');
            }).catch((err) => {

            });

            return false;
        },
        deleteFile: function() {

        },
        upload: function() {
            if (!this.isApiInitialized) {
                this.$toasted.error('Please provide apiKey first');
                return;
            }

            if (this.isUploading ||
                this.files.length === 0 ||
                !this.filesLoaded) {
                return;
            }

            this.isUploading = true;
            this.$store.dispatch('upload').then((res) => {
                this.$toasted.success('Files has been uploaded');
            }).catch(() => {

            });
        }
    }
};
