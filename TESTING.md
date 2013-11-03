Running the HTML5 player on your own website, or locally, you will need to have
PHP so that the `proxy.php` file can be used to load assets from the same domain.  This is done to be compatible with Javascript security models in today's browsers.  To test the HTML5 player against the Flash player you can use the compare.html web page.

# Ubuntu

If you're using Ubuntu, you can follow the following steps to set up the proxy correctly. You'll need to type the following commands in Terminal.

Install PHP and Apache for running the proxy file:

    $ sudo apt-get install apache2 php5

Fork this repository on Github, and then clone it into your home folder somewhere (replacing `<username>` with your Github username):

    $ git clone https://github.com/<username>/scratch-html5

We'd like to add a new localhost domain, so that we can access the player from our web browser. Something like `scratch.localhost`. Run this command to edit the `/etc/hosts` file:

    $ sudo nano /etc/hosts

Add the following line:

    127.0.0.1	scratch.localhost

Use <key>Ctrl-O</key>, <key>Return</key>, <key>Ctrl-X</key> to quit.

Now we want to add a new Apache configuration for the new domain. Run the following:

    $ cd /etc/apache2/sites-available/
    $ sudo nano scratch

And type in the following, replacing `user` with your username, and making sure the `DocumentRoot` matches where you cloned the repository earlier:

    <VirtualHost *:80>
        ServerName scratch.localhost
        DocumentRoot /home/user/scratch-html5
    </VirtualHost>

Finally, run the following commands to enable the site:

    $ sudo a2ensite scratch
    $ sudo service apache2 reload

Now when you go to <http://scratch.localhost/>, the project should play. If you get a "Forbidden" error message, you may need to check the permissions of the folders that the player code is in.

Now you can go fix bugs in the HTML5 player!
