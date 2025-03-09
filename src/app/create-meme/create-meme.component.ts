
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import Konva from 'konva';
import { CommonModule } from '@angular/common';
import { MenuItemService } from '../menu-item.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';




@Component({
  selector: 'app-create-meme',
  standalone: true,
  imports: [FileUploadModule,ToastModule,CommonModule,ScrollPanelModule,InputTextModule,FormsModule,ColorPickerModule,ButtonModule,InputNumberModule],
  templateUrl: './create-meme.component.html',
  styleUrls: ['./create-meme.component.css'],
  providers:[MessageService]
})
export class CreateMemeComponent implements AfterViewInit,OnInit,OnDestroy {
  constructor(private menuItemService:MenuItemService,private messageService: MessageService){}
  showSideView='Board'
  ngOnInit(): void {
    this.menuItemService.changeItem(
      [
        {
          label: 'Back',
          icon: 'bx bx-folder-plus',
          iconClass:'icon-a',
          routerLink:'/'
      },
        {
          label: 'Board',
          icon: 'bx bx-info-square',
          iconClass:'icon-a',
          command: () => {this.showSideView='Board'}
      }, 
        {
            label: 'Text',
            icon: 'bx bx-laugh',
            iconClass:'icon-a',
            command: () => {this.showSideView='Text'}
        },
        {
            label: 'Image',
            icon: 'bx bx-archive',
            iconClass:'icon-a',
            command: () => {this.showSideView='Image'}
        },
       
    ]
    
    )
  }
  ngOnDestroy(): void {
    this.menuItemService.changeItem( [
      {
          label: 'Project',
          icon: 'bx bx-folder-plus',
          iconClass:'icon-a',
          routerLink:'/'
      },
      {
          label: 'Create New Meme',
          icon: 'bx bx-laugh',
          iconClass:'icon-a',
          routerLink:'/create-meme'
      },
      {
          label: 'Archived',
          icon: 'bx bx-archive',
          iconClass:'icon-a'
      },
      {
          label: 'About',
          icon: 'bx bx-info-square',
          iconClass:'icon-a'
      }
  ]
  )
  }
  @ViewChild('stageContainer', { static: false }) stageContainer!: ElementRef;
  @ViewChild('Pdiv') Pdiv!: ElementRef;
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  background!: Konva.Rect;
  backgroundHeight!: number ; 
  backgroundWidth!: number ; 
  backgroundColor!: string; 

  // for input
  maxHeight!: number ; 
  maxWidth!: number ; 

  ngAfterViewInit() {
    const rect = this.Pdiv.nativeElement.getBoundingClientRect();
    console.log('Width:', rect.width, 'Height:', rect.height);
    this.maxHeight=parseInt(rect.height)-35
    this.maxWidth=parseInt(rect.width)-65

    this.backgroundHeight=parseInt(rect.height)-35
    this.backgroundWidth=parseInt(rect.width)-65

    this.stage = new Konva.Stage({
      container: this.stageContainer.nativeElement,
      width: this.backgroundWidth,
      height:this.backgroundHeight,
    });

    this.background = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.backgroundWidth,
      height: this.backgroundHeight,
      fill: this.backgroundColor, // Background color
      listening: false, // Prevents it from capturing mouse events
      // stroke: '#ffffff', // Border color
      // strokeWidth: 2, // Border thickness
      // dash: [5, 5], 
    });

    this.layer = new Konva.Layer();
    this.layer.add(this.background)
    this.stage.add(this.layer);
  }
  updateCanvas() {

    if (this.backgroundHeight> this.maxHeight){
      this.backgroundHeight=this.maxHeight
    }
    if(this.backgroundWidth>this.maxWidth){
      this.backgroundWidth=this.maxWidth
    }

    this.stage.height(this.backgroundHeight);
    this.background.height(this.backgroundHeight);
    this.stage.width(this.backgroundWidth);
    this.background.width(this.backgroundWidth);
    this.background.fill(this.backgroundColor)
    this.layer.batchDraw(); // Re-draw layer to apply changes
  }

  // addImage(event: any ,fileUploader: any) {
  //   debugger
  //   const files = event.files;
  //   if (!files) return;

  //   Array.from(files).forEach((file: any) => {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const img = new Image();
  //       img.src = e.target.result;
  //       img.onload = () => {
  //         const konvaImage = new Konva.Image({
  //           image: img,
  //           x: 50,
  //           y: 50,
  //           width: img.width / 2,
  //           height: img.height / 2,
  //           draggable: true
  //         });

  //         const transformer = new Konva.Transformer();
  //         this.layer.add(transformer);
  //         konvaImage.on('click', () => {
  //           transformer.nodes([konvaImage]);
  //         });

  //         this.layer.add(konvaImage);
  //         this.layer.draw();
  //       };
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // }

  @ViewChild('fileUploader') fileUploader!: FileUpload; // Reference to file uploader
  images: Konva.Image[] = []; // Store images array
  transformer!: Konva.Transformer; // Transformer reference
  addImage(event: any) {
    debugger
    if (!event.files || event.files.length === 0 || event.files[0].size>1000000) return;

    const files = event.files;
    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const konvaImage = new Konva.Image({
            image: img,
            x: 50,
            y: 50,
            width: img.width / 2,
            height: img.height / 2,
            draggable: true
          });
          this.layer.add(konvaImage);
        this.layer.draw();

        // Store images in an array for reference
        if (!this.images) {
          this.images = [];
        }
        this.images.push(konvaImage);

        // If a transformer already exists, remove it
        if (!this.transformer) {
          this.transformer = new Konva.Transformer();
          this.layer.add(this.transformer);
        }

        // Image click event: Select only the clicked image
        konvaImage.on('click', (e) => {
          e.cancelBubble = true; // Prevents event from propagating to stage
          this.transformer.nodes([konvaImage]); // Select this image
        });

        // Stage click event: Deselect all images
        this.stage.on('click', () => {
          this.transformer.nodes([]); // Clear selection when clicking on empty space
        });
          // const transformer = new Konva.Transformer();
          // this.layer.add(transformer);
          // konvaImage.on('click', () => {
          //   debugger
            
          //   transformer.nodes([konvaImage]);
         
          // });
       
        

          // this.layer.add(konvaImage);
          // console.log(this.layer)
          // this.layer.draw();

          // Reset file input after processing
          this.fileUploader.clear(); 
        };
      };
      reader.readAsDataURL(file);
    });
  }

  addText() {
    const textNode = new Konva.Text({
      text: 'Double Click to Edit',
      x: 100,
      y: 100,
      fontSize: 20,
      draggable: true,
      fill: 'black'
    });

    const transformer = new Konva.Transformer({
      enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < 30 || newBox.height < 30) {
          return oldBox;
        }
        return newBox;
      }
    });

    this.layer.add(transformer);

    textNode.on('transform', () => {
      textNode.setAttrs({
        scaleX: 1,
        scaleY: 1,
        fontSize: textNode.fontSize() * textNode.scaleX()
      });
      this.layer.draw();
    });

    textNode.on('click', () => {
      transformer.nodes([textNode]);
    });

    this.layer.add(textNode);
    this.layer.draw();

    textNode.on('dblclick', () => {
      textNode.hide();
      transformer.hide();
      this.layer.draw();

      const textPosition = textNode.getAbsolutePosition();
      const stageBox = this.stage.container().getBoundingClientRect();

      const input = document.createElement('input');
      input.type = 'text';
      input.value = textNode.text();
      input.style.position = 'absolute';
      input.style.left = `${stageBox.left + textPosition.x}px`;
      input.style.top = `${stageBox.top + textPosition.y}px`;
      input.style.width = `${textNode.width()}px`;
      input.style.fontSize = `${textNode.fontSize()}px`;
      input.style.fontFamily = textNode.fontFamily();
      input.style.color = textNode.fill().toString();
      input.style.border = 'none';
      input.style.outline = 'none';
      input.style.background = 'transparent';
      input.style.padding = '0px';
      input.style.margin = '0px';

      document.body.appendChild(input);
      input.focus();

      input.addEventListener('input', () => {
        textNode.text(input.value);
        this.layer.draw();
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          finishEditing();
        }
      });

      input.addEventListener('blur', () => {
        finishEditing();
      });

      const finishEditing = () => {
        textNode.text(input.value);
        textNode.show();
        transformer.show();
        this.layer.draw();
        document.body.removeChild(input);
      };
    });
  }

  clearCanvas() {
    this.layer.destroyChildren();
    this.layer.draw();
  }
  downloadCanvas() {
    const dataURL = this.stage.toDataURL({ pixelRatio: 2 }); // High-resolution
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


}


// import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import Konva from 'konva';



// @Component({
//   selector: 'app-create-meme',
//   standalone: true,
//   imports: [],
//   templateUrl: './create-meme.component.html',
//   styleUrl: './create-meme.component.css'
// })
// export class CreateMemeComponent  implements AfterViewInit {

//   @ViewChild('stageContainer', { static: false }) stageContainer!: ElementRef;
//   stage!: Konva.Stage;
//   layer!: Konva.Layer;

//   ngAfterViewInit() {
//     this.stage = new Konva.Stage({
      
//       container: this.stageContainer.nativeElement,
//       width: this.stageContainer.nativeElement.width,
//       height: 500
//     });

//     this.layer = new Konva.Layer();
//     this.stage.add(this.layer);
//   }

//   addImage(event: any) {
//     const files = event.target.files;
//     if (!files) return;

//     Array.from(files).forEach((file: any) => {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         const img = new Image();
//         img.src = e.target.result;
//         img.onload = () => {
//           const konvaImage = new Konva.Image({
//             image: img,
//             x: 50,
//             y: 50,
//             width: img.width / 2,
//             height: img.height / 2,
//             draggable: true
//           });

//           const transformer = new Konva.Transformer();
//           this.layer.add(transformer);
//           konvaImage.on('click', () => {
//             transformer.nodes([konvaImage]);
//           });

//           this.layer.add(konvaImage);
//           this.layer.draw();
//         };
//       };
//       reader.readAsDataURL(file);
//     });
//   }

//   addText() {
//     const textNode = new Konva.Text({
//       text: 'Double Click to Edit',
//       x: 100,
//       y: 100,
//       fontSize: 20,
//       draggable: true,
//       fill: 'black'
//     });
  
//     const transformer = new Konva.Transformer({
//       enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
//       boundBoxFunc: (oldBox, newBox) => {
//         // Limit resizing to avoid negative values
//         if (newBox.width < 30 || newBox.height < 30) {
//           return oldBox;
//         }
//         return newBox;
//       }
//     });
  
//     this.layer.add(transformer);
  
//     // Reset scale after transforming to keep text size consistent
//     textNode.on('transform', () => {
//       textNode.setAttrs({
//         scaleX: 1,
//         scaleY: 1,
//         fontSize: textNode.fontSize() * textNode.scaleX()
//       });
//       this.layer.draw();
//     });
  
//     textNode.on('click', () => {
//       transformer.nodes([textNode]);
//     });
  
//     this.layer.add(textNode);
//     this.layer.draw();
  
//     textNode.on('dblclick', () => {
//       textNode.hide();
//       transformer.hide();
//       this.layer.draw();
  
//       const textPosition = textNode.getAbsolutePosition();
//       const stageBox = this.stage.container().getBoundingClientRect();
  
//       const input = document.createElement('input');
//       input.type = 'text';
//       input.value = textNode.text();
//       input.style.position = 'absolute';
//       input.style.left = `${stageBox.left + textPosition.x}px`;
//       input.style.top = `${stageBox.top + textPosition.y}px`;
//       input.style.width = `${textNode.width()}px`;
//       input.style.fontSize = `${textNode.fontSize()}px`;
//       input.style.fontFamily = textNode.fontFamily();
//       input.style.color = textNode.fill().toString();
//       input.style.border = 'none';
//       input.style.outline = 'none';
//       input.style.background = 'transparent';
//       input.style.padding = '0px';
//       input.style.margin = '0px';
    
//       document.body.appendChild(input);
//       input.focus();
  
//       input.addEventListener('input', () => {
//         textNode.text(input.value);
//         this.layer.draw();
//       });
  
//       input.addEventListener('keydown', (e) => {
//         if (e.key === 'Enter') {
//           finishEditing();
//         }
//       });
  
//       input.addEventListener('blur', () => {
//         finishEditing();
//       });
  
//       const finishEditing = () => {
//         textNode.text(input.value);
//         textNode.show();
//         transformer.show();
//         this.layer.draw();
//         document.body.removeChild(input);
//       };
//     });
//   }
  

//   // addText() {
//   //   const textNode = new Konva.Text({
//   //     text: 'Double Click to Edit',
//   //     x: 100,
//   //     y: 100,
//   //     fontSize: 20,
//   //     draggable: true,
//   //     fill: 'black'
//   //   });
  
//   //   const transformer = new Konva.Transformer();
//   //   this.layer.add(transformer);
    
//   //   textNode.on('click', () => {
//   //     transformer.nodes([textNode]);
//   //   });
  
//   //   this.layer.add(textNode);
//   //   this.layer.draw();
  
//   //   textNode.on('dblclick', () => {
//   //     textNode.hide(); // Hide the original text during editing
//   //     this.layer.draw();
  
//   //     // Create an input field inside the Konva container
//   //     const input = document.createElement('input');
//   //     input.type = 'text';
//   //     input.value = textNode.text();
  
//   //     // Get the position relative to the canvas
//   //     const textPosition = textNode.getAbsolutePosition();
//   //     const stageBox = this.stage.container().getBoundingClientRect();
  
//   //     input.style.position = 'absolute';
//   //     input.style.left = `${stageBox.left + textPosition.x}px`;
//   //     input.style.top = `${stageBox.top + textPosition.y}px`;
//   //     input.style.width = `${textNode.width()}px`;
//   //     input.style.fontSize = `${textNode.fontSize()}px`;
//   //     input.style.fontFamily = textNode.fontFamily();
//   //     input.style.color = textNode.fill().toString();
//   //     input.style.border = 'none';
//   //     input.style.outline = 'none';
//   //     input.style.background = 'transparent';
//   //     input.style.padding = '0px';
//   //     input.style.margin = '0px';
  
//   //     document.body.appendChild(input);
//   //     input.focus();
  
//   //     // Handle text updates in real-time
//   //     input.addEventListener('input', () => {
//   //       textNode.text(input.value);
//   //       this.layer.draw();
//   //     });
  
//   //     // Handle Enter key and blur event
//   //     input.addEventListener('keydown', (e) => {
//   //       if (e.key === 'Enter') {
//   //         finishEditing();
//   //       }
//   //     });
  
//   //     input.addEventListener('blur', () => {
//   //       finishEditing();
//   //     });
  
//   //     // Function to finalize text input
//   //     const finishEditing = () => {
//   //       textNode.text(input.value);
//   //       textNode.show(); // Show the original text node
//   //       this.layer.draw();
//   //       document.body.removeChild(input);
//   //     };
//   //   });
//   // }
 
  

//   clearCanvas() {
//     this.layer.destroyChildren();
//     this.layer.draw();
//   }
// }