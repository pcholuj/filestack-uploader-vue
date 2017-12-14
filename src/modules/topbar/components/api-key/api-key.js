import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            apikey: 123
        };
    },
    computed: {
        ...mapGetters([
            'isAuthenticated'
        ])
    },
    mounted: function() {
        console.log(this);
        console.log('component created');
    },
    methods: {
        submit: () => {
            console.log('form api submit');
        }
    }
};
