// design-persistence-manager.js

/**
 * Design Persistence Manager
 * 
 * Provides functionality to save, load, and manage architectural designs
 * for the Architect3D application.
 */

class DesignPersistenceManager {
    constructor() {
      this.storageKey = 'architect3d_designs';
      this.currentDesignKey = 'architect3d_current_design';
    }
  
    /**
     * Save a design with a given name
     * @param {string} name - The name of the design
     * @param {Object} designData - The complete design object
     * @returns {boolean} - Success status
     */
    saveDesign(name, designData) {
      try {
        // Add metadata
        const designWithMetadata = {
          ...designData,
          name,
          id: designData.id || this._generateId(),
          lastModified: new Date().toISOString(),
          createdAt: designData.createdAt || new Date().toISOString()
        };
  
        // Get existing designs
        const designs = this.getAllDesigns();
        
        // Update or add the design
        const existingIndex = designs.findIndex(d => d.id === designWithMetadata.id);
        if (existingIndex >= 0) {
          designs[existingIndex] = designWithMetadata;
        } else {
          designs.push(designWithMetadata);
        }
  
        // Save to localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(designs));
        
        // Update current design
        this.setCurrentDesign(designWithMetadata.id);
        
        return true;
      } catch (error) {
        console.error('Error saving design:', error);
        return false;
      }
    }
  
    /**
     * Load a design by ID
     * @param {string} id - The ID of the design to load
     * @returns {Object|null} - The design object or null if not found
     */
    loadDesign(id) {
      try {
        const designs = this.getAllDesigns();
        const design = designs.find(d => d.id === id);
        
        if (design) {
          this.setCurrentDesign(id);
          return design;
        }
        
        return null;
      } catch (error) {
        console.error('Error loading design:', error);
        return null;
      }
    }
  
    /**
     * Delete a design by ID
     * @param {string} id - The ID of the design to delete
     * @returns {boolean} - Success status
     */
    deleteDesign(id) {
      try {
        let designs = this.getAllDesigns();
        designs = designs.filter(d => d.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(designs));
        
        // Clear current design if it was the one deleted
        if (this.getCurrentDesignId() === id) {
          this.clearCurrentDesign();
        }
        
        return true;
      } catch (error) {
        console.error('Error deleting design:', error);
        return false;
      }
    }
  
    /**
     * Get all saved designs
     * @returns {Array} - Array of design objects
     */
    getAllDesigns() {
      try {
        const designsJson = localStorage.getItem(this.storageKey);
        return designsJson ? JSON.parse(designsJson) : [];
      } catch (error) {
        console.error('Error getting designs:', error);
        return [];
      }
    }
  
    /**
     * Set the current working design
     * @param {string} id - The ID of the current design
     */
    setCurrentDesign(id) {
      localStorage.setItem(this.currentDesignKey, id);
    }
  
    /**
     * Get the current design ID
     * @returns {string|null} - The current design ID or null
     */
    getCurrentDesignId() {
      return localStorage.getItem(this.currentDesignKey);
    }
  
    /**
     * Get the current design object
     * @returns {Object|null} - The current design object or null
     */
    getCurrentDesign() {
      const currentId = this.getCurrentDesignId();
      return currentId ? this.loadDesign(currentId) : null;
    }
  
    /**
     * Clear the current design selection
     */
    clearCurrentDesign() {
      localStorage.removeItem(this.currentDesignKey);
    }
  
    /**
     * Export a design to a downloadable JSON file
     * @param {string} id - The ID of the design to export
     * @returns {boolean} - Success status
     */
    exportDesign(id) {
      try {
        const design = this.loadDesign(id);
        
        if (!design) {
          return false;
        }
        
        const dataStr = JSON.stringify(design, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportName = `${design.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportName);
        linkElement.click();
        
        return true;
      } catch (error) {
        console.error('Error exporting design:', error);
        return false;
      }
    }
  
    /**
     * Import a design from a JSON file
     * @param {File} file - The file object to import
     * @returns {Promise<boolean>} - Success status
     */
    importDesign(file) {
      return new Promise((resolve, reject) => {
        try {
          const reader = new FileReader();
          
          reader.onload = (event) => {
            try {
              const designData = JSON.parse(event.target.result);
              
              // Validate basic structure
              if (!designData.name) {
                designData.name = 'Imported Design';
              }
              
              // Generate new ID to avoid conflicts
              designData.id = this._generateId();
              designData.importedAt = new Date().toISOString();
              
              const success = this.saveDesign(designData.name, designData);
              resolve(success);
            } catch (parseError) {
              console.error('Error parsing imported design:', parseError);
              resolve(false);
            }
          };
          
          reader.onerror = () => {
            console.error('Error reading file');
            resolve(false);
          };
          
          reader.readAsText(file);
        } catch (error) {
          console.error('Error importing design:', error);
          resolve(false);
        }
      });
    }
  
    /**
     * Create a backup of all designs
     * @returns {boolean} - Success status
     */
    createBackup() {
      try {
        const designs = this.getAllDesigns();
        const backup = {
          designs,
          timestamp: new Date().toISOString(),
          version: '1.0'
        };
        
        const dataStr = JSON.stringify(backup, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportName = `architect3d_backup_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportName);
        linkElement.click();
        
        return true;
      } catch (error) {
        console.error('Error creating backup:', error);
        return false;
      }
    }
  
    /**
     * Restore designs from a backup file
     * @param {File} file - The backup file
     * @returns {Promise<boolean>} - Success status
     */
    restoreBackup(file) {
      return new Promise((resolve, reject) => {
        try {
          const reader = new FileReader();
          
          reader.onload = (event) => {
            try {
              const backupData = JSON.parse(event.target.result);
              
              // Basic validation
              if (!backupData.designs || !Array.isArray(backupData.designs)) {
                resolve(false);
                return;
              }
              
              // Restore designs
              localStorage.setItem(this.storageKey, JSON.stringify(backupData.designs));
              resolve(true);
            } catch (parseError) {
              console.error('Error parsing backup file:', parseError);
              resolve(false);
            }
          };
          
          reader.onerror = () => {
            console.error('Error reading backup file');
            resolve(false);
          };
          
          reader.readAsText(file);
        } catch (error) {
          console.error('Error restoring backup:', error);
          resolve(false);
        }
      });
    }
  
    /**
     * Generate a unique ID
     * @returns {string} - A unique ID
     * @private
     */
    _generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    }
    
    /**
     * Check if the browser supports local storage
     * @returns {boolean} - Whether localStorage is available
     */
    isStorageAvailable() {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
  
  // Export a singleton instance
  const designPersistenceManager = new DesignPersistenceManager();
  export default designPersistenceManager;