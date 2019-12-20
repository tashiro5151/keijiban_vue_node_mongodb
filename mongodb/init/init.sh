mongo <<EOF
use keijiban
db.createCollection('tmp')
use keijiban
db.createCollection('tmp');
EOF