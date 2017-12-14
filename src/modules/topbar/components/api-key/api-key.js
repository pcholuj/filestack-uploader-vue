import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            apikey: null
        };
    },
    computed: {
        ...mapGetters([
            'isApiInitialized'
        ]),
        ...mapActions([
            'initializeApi'
        ])
    },
    mounted: function() {
        const apikey = this.$localStorage.get('apikey');
        this.apikey = apikey;

        if (apikey) {
            this.$store.dispatch('initializeApi', this.apikey);
        }

        console.log('apiInitialized', this.isApiInitialized);
    },
    methods: {
        submit() {
            this.$localStorage.set('apikey', this.apikey);
            this.$store.dispatch('initializeApi', this.apikey);
        }
    }
};
