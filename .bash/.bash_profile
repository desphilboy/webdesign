export GITAWAREPROMPT=~/.bash/git-aware-prompt
source "${GITAWAREPROMPT}/main.sh"

PS1="\[\033[32m\]\t \u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\[$txtcyn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "

