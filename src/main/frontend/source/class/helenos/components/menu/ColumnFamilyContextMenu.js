/* ************************************************************************
Copyright:
  2012 Tomek Kuprowski
License:
  GPLv2: http://www.gnu.org/licences/gpl.html
Authors:
  Tomek Kuprowski (tomekkuprowski at gmail dot com)
 ************************************************************************ */
/*
#asset(qx/icon/${qx.icontheme}/16/status/dialog-information.png)
#asset(qx/icon/${qx.icontheme}/16/actions/edit-delete.png)
#asset(qx/icon/${qx.icontheme}/16/actions/edit-clear.png)
#asset(qx/icon/${qx.icontheme}/16/apps/office-spreadsheet.png)
*/
qx.Class.define("helenos.components.menu.ColumnFamilyContextMenu",
{
    extend : qx.ui.menu.Menu,
 
    construct : function(ksName, cfName)
    {
        this.base(arguments);
        
        var propsButton = new qx.ui.menu.Button("Properties", "icon/16/status/dialog-information.png");
        propsButton.setUserData('KSNAME', ksName);
        propsButton.setUserData('CFNAME', cfName);
        propsButton.addListener("execute", this.__showProperties);
        this.add(propsButton);
        
        var browserButton = new qx.ui.menu.Button("Browse", "icon/16/apps/office-spreadsheet.png");
        browserButton.setUserData('KSNAME', ksName);
        browserButton.setUserData('CFNAME', cfName);
        browserButton.addListener("execute", this.__showBrowserPane);
        this.add(browserButton);
        
        this.add(new qx.ui.menu.Separator());
        
        var dropButton = new qx.ui.menu.Button("Drop", "icon/16/actions/edit-delete.png");
        dropButton.setUserData('KSNAME', ksName);
        dropButton.setUserData('CFNAME', cfName);
        dropButton.addListener("execute", this.__dropColumnFamily);
        this.add(dropButton);
        
        var truncateButton = new qx.ui.menu.Button("Truncate", "icon/16/actions/edit-clear.png");
        truncateButton.setUserData('KSNAME', ksName);
        truncateButton.setUserData('CFNAME', cfName);
        truncateButton.addListener("execute", this.__truncateColumnFamily);
        this.add(truncateButton);
    },
    
    members : {
        __showProperties : function(e) {
            var ksName = e.getTarget().getUserData('KSNAME');
            var cfName = e.getTarget().getUserData('CFNAME');
            
            helenos.util.GuiObserver.showColumnFamilyInfoTab(ksName, cfName);
        },
        
        __truncateColumnFamily : function(e) {
            var ksName = e.getTarget().getUserData('KSNAME');
            var cfName = e.getTarget().getUserData('CFNAME');
            dialog.Dialog.confirm(this.tr('loss.data.alert'), function(ret) {
                if (ret == true) {
                    helenos.util.RpcActionsProvider.truncateColumnFamily(ksName, cfName);
                    //helenos.util.GuiObserver.refreshSchemaTree();
                }
            }, this);
        },
        
        __showBrowserPane : function(e) {
            var ksName = e.getTarget().getUserData('KSNAME');
            var cfName = e.getTarget().getUserData('CFNAME');
            helenos.util.GuiObserver.showBrowserTab(ksName, cfName);
        },
        
        __dropColumnFamily : function(e) {
            var ksName = e.getTarget().getUserData('KSNAME');
            var cfName = e.getTarget().getUserData('CFNAME');
            dialog.Dialog.confirm(this.tr('loss.data.alert'), function(ret) {
                if (ret == true) {
                    helenos.util.RpcActionsProvider.dropColumnFamily(ksName, cfName);
                    helenos.util.GuiObserver.refreshSchemaTree();
                }
            }, this);
        }
    }
});