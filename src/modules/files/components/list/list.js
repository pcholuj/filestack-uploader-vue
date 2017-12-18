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

            this.$toasted.info('Loading files, Please wait');

            this.$store.dispatch('loadFiles', e.target.files).then(() => {
                this.$toasted.clear();
                this.filesLoaded = true;
                this.$toasted.success('Files has been loaded, you can now upload them to filestack');
            }).catch((err) => {
                this.$toasted.error('There was problem during loading files' + err.message);
            });

            return false;
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

            this.$toasted.info('Uploading files please wait.');

            this.isUploading = true;
            this.$store.dispatch('upload').then((res) => {
                let isError = !!res.filter(result => (result instanceof Error)).length;

                this.isUploading = false;

                if (isError) {
                    this.$toasted.error('There was problem during uploading marked files.');
                    return;
                }

                this.$toasted.success('Files has been uploaded');
            });
        }
    }
};
