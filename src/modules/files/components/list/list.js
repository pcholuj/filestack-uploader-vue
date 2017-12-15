import { mapState, mapMutations } from 'vuex';
import Thumbnail from './components/thumbnail/thumbnail.vue';

export default {
    name: 'FilesList',
    components: {
        'thumbnail': Thumbnail
    },
    computed: {
        ...mapState({
            files: ({ files }) => files.files
        })
    },
    methods: {
        load: function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (!e.target.files) {
                return false;
            }

            this.$store.dispatch('loadFiles', e.target.files).then(() => {
                // upload test
                this.$store.dispatch('upload');
                console.log('read done');
            });

            return false;
        },
        upload: () => {

        }
    }
};
