# Angular-Express-Yeoman Boilerplate

#git init
Add the files in your new local repository. This stages them for the first commit.

#git add .

 Adds the files in the local repository and stages them for commit. To unstage a file, use 'git reset HEAD YOUR-FILE'.
Commit the files that you've staged in your local repository.

#git commit -m 'First commit'

 Commits the tracked changes and prepares them to be pushed to a remote repository. To remove this commit and modify the file, use 'git reset --soft HEAD~1' and commit and add the file again.
Copy remote repository URL fieldAt the top of your GitHub repository's Quick Setup page, click  to copy the remote repository URL.
In the Command prompt, add the URL for the remote repository where your local repository will be pushed.

#git remote add origin https://github.com/thakurarun/yeoman-angular-express-app
Sets the new remote
#git remote -v

Push the changes in your local repository to GitHub.
#git push origin master

Boilerplate By:
https://github.com/yeoman/generator-angular#directive

…or create a new repository on the command line
echo # yeoman-angular-express-app >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/thakurarun/yeoman-angular-express-app.git
git push -u origin master

…or push an existing repository from the command line
git remote add origin https://github.com/thakurarun/yeoman-angular-express-app.git
git push -u origin master


